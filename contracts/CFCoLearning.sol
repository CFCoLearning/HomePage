// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title ProjectNFTManager
 * @dev 整合项目管理、奖励发放和NFT认证的合约
 * 管理用户完成项目的状态，分发CFC代币奖励，并铸造成就NFT
 */
contract ProjectNFTManager is Ownable {
    using SafeERC20 for IERC20;
    
    // CFC代币合约
    IERC20 public cfcToken;
    
    // NFT合约接口
    IERC721 public nftContract;
    
    // 用户上次领取奖励的时间
    mapping(address => uint256) private _lastClaimTime;
    
    // 用户可获得的奖励数量
    mapping(address => uint256) private _availableRewards;
    
    // 奖励锁定期
    uint256 public constant CLAIM_COOLDOWN = 1 minutes;
    
    // 项目状态枚举
    enum ProjectStatus { ACTIVE, COMPLETED, ARCHIVED }
    
    // 项目信息结构
    struct Project {
        string id;               // 项目标识符
        string name;             // 项目名称
        string description;      // 项目描述
        uint256 startTime;       // 开始时间
        uint256 endTime;         // 结束时间
        uint256 rewardAmount;    // 完成项目奖励的代币数量
        ProjectStatus status;    // 项目状态
        uint256 requiredTaskCount; // 需要完成的任务数量
        uint256 passingScore;    // 通过所需的最低分数 (百分比，例如：70表示70%)
    }
    
    // 用户完成项目的记录
    struct UserProjectStatus {
        bool registered;         // 是否注册参与
        uint256 completedTasks;  // 已完成的任务数
        uint256 score;           // 项目得分
        bool hasClaimedReward;   // 是否已领取代币奖励
        bool hasClaimedNFT;      // 是否已铸造NFT
    }
    
    // 所有项目
    Project[] public projects;
    
    // 项目ID到项目索引的映射
    mapping(string => uint256) private projectIdToIndex;
    
    // 用户地址 => 项目ID => 用户项目状态
    mapping(address => mapping(string => UserProjectStatus)) public userProjects;
    
    // 事件定义
    // 项目相关事件
    event ProjectCreated(string indexed projectId, string name, uint256 startTime, uint256 endTime);
    event ProjectUpdated(string indexed projectId, ProjectStatus status);
    event UserRegistered(address indexed user, string indexed projectId);
    event TaskCompleted(address indexed user, string indexed projectId, uint256 taskCount);
    event ProjectScoreUpdated(address indexed user, string indexed projectId, uint256 score);
    
    // 奖励相关事件
    event RewardAdded(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);
    event ProjectRewardClaimed(address indexed user, string indexed projectId, uint256 amount);
    
    // NFT相关事件
    event NFTClaimed(address indexed user, string indexed projectId, uint256 tokenId);
    event TokenContractUpdated(address indexed newTokenContract);
    event NFTContractUpdated(address indexed newNFTContract);

    /**
     * @dev 构造函数
     * @param tokenAddress CFC代币合约地址
     * @param nftAddress 成就NFT合约地址
     */
    constructor(address tokenAddress, address nftAddress) Ownable(msg.sender) {
        require(tokenAddress != address(0), "Token address cannot be zero");
        cfcToken = IERC20(tokenAddress);
        
        if (nftAddress != address(0)) {
            nftContract = IERC721(nftAddress);
        }
    }
    
    /**
     * @dev 更新代币合约地址
     * @param newTokenAddress 新的代币合约地址
     */
    function updateTokenContract(address newTokenAddress) external onlyOwner {
        require(newTokenAddress != address(0), "Token address cannot be zero");
        cfcToken = IERC20(newTokenAddress);
        emit TokenContractUpdated(newTokenAddress);
    }
    
    /**
     * @dev 更新NFT合约地址
     * @param newNFTAddress 新的NFT合约地址
     */
    function updateNFTContract(address newNFTAddress) external onlyOwner {
        require(newNFTAddress != address(0), "NFT address cannot be zero");
        nftContract = IERC721(newNFTAddress);
        emit NFTContractUpdated(newNFTAddress);
    }

    /**
     * @dev 创建新项目
     * @param _id 项目ID
     * @param _name 项目名称
     * @param _description 项目描述
     * @param _startTime 开始时间
     * @param _endTime 结束时间
     * @param _rewardAmount 奖励代币数量
     * @param _requiredTaskCount 所需完成的任务数量
     * @param _passingScore 及格分数(百分比)
     */
    function createProject(
        string calldata _id,
        string calldata _name,
        string calldata _description,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _rewardAmount,
        uint256 _requiredTaskCount,
        uint256 _passingScore
    ) external onlyOwner {
        require(bytes(_id).length > 0, "Item ID cannot be empty");
        require(_startTime < _endTime, "Start time must be earlier than end time");
        require(_passingScore <= 100, "The passing score cannot exceed 100");
        require(projectIdToIndex[_id] == 0, "Project ID already exists");
        
        Project memory newProject = Project({
            id: _id,
            name: _name,
            description: _description,
            startTime: _startTime,
            endTime: _endTime,
            rewardAmount: _rewardAmount,
            status: ProjectStatus.ACTIVE,
            requiredTaskCount: _requiredTaskCount,
            passingScore: _passingScore
        });
        
        projects.push(newProject);
        // 索引从1开始，避免与默认值0冲突
        projectIdToIndex[_id] = projects.length;
        
        emit ProjectCreated(_id, _name, _startTime, _endTime);
    }
    
    /**
     * @dev 更新项目状态
     * @param _projectId 项目ID
     * @param _status 新状态
     */
    function updateProjectStatus(string calldata _projectId, ProjectStatus _status) external onlyOwner {
        uint256 projectIndex = getProjectIndex(_projectId);
        projects[projectIndex].status = _status;
        
        emit ProjectUpdated(_projectId, _status);
    }
    
    /**
     * @dev 用户注册参与项目
     * @param user 用户地址
     * @param _projectId 项目ID
     */
    function registerForProject(address user, string calldata _projectId) external {
        uint256 projectIndex = getProjectIndex(_projectId);
        Project memory project = projects[projectIndex];
        
        require(project.status == ProjectStatus.ACTIVE, "Project is not active");
        require(block.timestamp >= project.startTime, "Project not started yet");
        require(block.timestamp <= project.endTime, "project is closed");
        require(!userProjects[user][_projectId].registered, "This item is already registered");
        
        userProjects[user][_projectId] = UserProjectStatus({
            registered: true,
            completedTasks: 0,
            score: 0,
            hasClaimedReward: false,
            hasClaimedNFT: false
        });
        
        emit UserRegistered(user, _projectId);
    }
    
    /**
     * @dev 更新用户完成的任务数量(由管理员调用)
     * @param _user 用户地址
     * @param _projectId 项目ID
     * @param _taskCount 已完成任务数
     */
    function updateCompletedTasks(address _user, string calldata _projectId, uint256 _taskCount) external onlyOwner {
        require(userProjects[_user][_projectId].registered, "User not registered for this item");
        
        uint256 projectIndex = getProjectIndex(_projectId);
        Project memory project = projects[projectIndex];
        
        require(_taskCount <= project.requiredTaskCount, "The number of completed tasks cannot exceed the requirements");
        
        userProjects[_user][_projectId].completedTasks = _taskCount;
        
        // 更新得分
        uint256 score = (_taskCount * 100) / project.requiredTaskCount;
        userProjects[_user][_projectId].score = score;
        
        emit TaskCompleted(_user, _projectId, _taskCount);
        emit ProjectScoreUpdated(_user, _projectId, score);
    }
    
    /**
     * @dev 手动设置用户项目得分(由管理员调用)
     * @param _user 用户地址
     * @param _projectId 项目ID
     * @param _score 得分(0-100)
     */
    function setProjectScore(address _user, string calldata _projectId, uint256 _score) external onlyOwner {
        require(userProjects[_user][_projectId].registered, "User not registered for this item");
        require(_score <= 100, "Scores cannot exceed 100");
        
        userProjects[_user][_projectId].score = _score;
        
        emit ProjectScoreUpdated(_user, _projectId, _score);
    }
    
    /**
     * @dev 为指定用户添加奖励(不关联特定项目)
     * @param user 用户地址
     * @param amount 奖励数量
     */
    function addReward(address user, uint256 amount) external onlyOwner {
        require(user != address(0), "invalid address");
        require(amount > 0, "Quantity must be greater than 0");
        
        _availableRewards[user] += amount;
        
        emit RewardAdded(user, amount);
    }

    /**
     * @dev 批量为用户添加奖励
     * @param users 用户地址数组
     * @param amounts 奖励数量数组
     */
    function batchAddRewards(address[] calldata users, uint256[] calldata amounts) external onlyOwner {
        require(users.length == amounts.length, "Array length mismatch");
        require(users.length > 0, "Array cannot be empty");
        
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i] != address(0) && amounts[i] > 0) {
                _availableRewards[users[i]] += amounts[i];
                emit RewardAdded(users[i], amounts[i]);
            }
        }
    }
    
    /**
     * @dev 验证用户是否有资格铸造NFT
     * @param _user 用户地址
     * @param _projectId 项目ID
     * @return 是否有资格
     */
    function canMintNFT(address _user, string calldata _projectId) external view returns (bool) {
        if (!userProjects[_user][_projectId].registered) {
            return false;
        }
        
        if (userProjects[_user][_projectId].hasClaimedNFT) {
            return false;
        }
        
        uint256 projectIndex = getProjectIndex(_projectId);
        Project memory project = projects[projectIndex];
        
        // 检查用户是否已经达到通过标准
        return userProjects[_user][_projectId].score >= project.passingScore;
    }
    
    /**
     * @dev 用户领取项目完成奖励
     * @param _projectId 项目ID
     * @return 是否成功
     */
    function claimProjectReward(string calldata _projectId) external returns (bool) {
        uint256 projectIndex = getProjectIndex(_projectId);
        Project memory project = projects[projectIndex];
        
        require(userProjects[msg.sender][_projectId].registered, "This item is not registered");
        require(userProjects[msg.sender][_projectId].score >= project.passingScore, "Failure to achieve a passing grade");
        require(!userProjects[msg.sender][_projectId].hasClaimedReward, "Reward received");
        
        userProjects[msg.sender][_projectId].hasClaimedReward = true;
        
        // 发放代币奖励
        bool success = _transferReward(msg.sender, project.rewardAmount);
        require(success, "Token transfer failed");
        
        emit ProjectRewardClaimed(msg.sender, _projectId, project.rewardAmount);
        return true;
    }
    
    /**
     * @dev 用户铸造项目完成NFT
     * @param _projectId 项目id
     * @param _tokenId NFT ID
     * @return 是否成功
     */
    function mintProjectNFT(string calldata _projectId, string calldata _tokenId) external returns (bool) {
        require(address(nftContract) != address(0), "NFT contract not set");
        
        uint256 projectIndex = getProjectIndex(_projectId);
        Project memory project = projects[projectIndex];
        
        require(userProjects[msg.sender][_projectId].registered, "This item is not registered");
        require(userProjects[msg.sender][_projectId].score >= project.passingScore, "Failure to achieve a passing grade");
        require(!userProjects[msg.sender][_projectId].hasClaimedNFT, "Cast NFT");
        
        // 标记为已铸造NFT
        userProjects[msg.sender][_projectId].hasClaimedNFT = true;
        
        (bool success, bytes memory data) = address(nftContract).call(
            abi.encodeWithSignature("safeTransferFrom(address,address,uint256)", msg.sender, _projectId)
        );
        require(success, "NFT casting failure");
        
        uint256 tokenId = abi.decode(data, (uint256));
        emit NFTClaimed(msg.sender, _projectId, tokenId);
        
        return true;
    }

    /**
     * @dev 用户领取非项目相关的通用奖励
     * @return 是否成功领取
     */
    function claimRewards() external returns (bool) {
        uint256 amount = _availableRewards[msg.sender];
        require(amount > 0, "There are no rewards available.");
        
        // 检查冷却期
        if (_lastClaimTime[msg.sender] > 0) {
            require(
                block.timestamp >= _lastClaimTime[msg.sender] + CLAIM_COOLDOWN,
                "The cooling-off period has not expired"
            );
        }
        
        // 更新状态（先更新状态再转账，防止重入攻击）
        _availableRewards[msg.sender] = 0;
        _lastClaimTime[msg.sender] = block.timestamp;
        
        // 转移代币
        bool success = _transferReward(msg.sender, amount);
        require(success, "Token transfer failed");
        
        emit RewardClaimed(msg.sender, amount);
        return true;
    }
    
    /**
     * @dev 内部函数，处理奖励转账逻辑
     * @param to 接收地址
     * @param amount 转账数量
     * @return 是否成功
     */
    function _transferReward(address to, uint256 amount) internal returns (bool) {
        // 尝试从合约余额中转账
        uint256 contractBalance = cfcToken.balanceOf(address(this));
        if (contractBalance >= amount) {
            // 如果合约余额足够，直接转账
            cfcToken.safeTransfer(to, amount);
            return true;
        } else {
            // 如果合约余额不足，尝试从owner转账
            try cfcToken.transferFrom(owner(), to, amount) {
                return true;
            } catch {
                return false;
            }
        }
    }

    /**
     * @dev 存入代币到合约（用于后续奖励发放）
     * @param amount 存入数量
     */
    function depositTokens(uint256 amount) external {
        require(amount > 0, "Quantity must be greater than 0");
        cfcToken.safeTransferFrom(msg.sender, address(this), amount);
    }

    /**
     * @dev 查询用户可领取的非项目相关奖励
     * @param account 用户地址
     * @return 可领取的奖励数量
     */
    function availableRewards(address account) external view returns (uint256) {
        return _availableRewards[account];
    }

    /**
     * @dev 查询用户上次领取奖励的时间
     * @param account 用户地址
     * @return 上次领取时间（时间戳）
     */
    function lastClaimTime(address account) external view returns (uint256) {
        return _lastClaimTime[account];
    }

    /**
     * @dev 检查用户当前是否可以领取通用奖励
     * @param account 用户地址
     * @return 是否可以领取
     */
    function canClaim(address account) external view returns (bool) {
        if (_availableRewards[account] == 0) {
            return false;
        }
        
        if (_lastClaimTime[account] == 0) {
            return true;
        }
        
        return block.timestamp >= _lastClaimTime[account] + CLAIM_COOLDOWN;
    }

    /**
     * @dev 计算用户还需等待多长时间才能领取通用奖励
     * @param account 用户地址
     * @return 需要等待的时间（秒）
     */
    function timeUntilNextClaim(address account) external view returns (uint256) {
        if (_availableRewards[account] == 0 || _lastClaimTime[account] == 0) {
            return 0;
        }
        
        uint256 nextClaimTime = _lastClaimTime[account] + CLAIM_COOLDOWN;
        if (block.timestamp >= nextClaimTime) {
            return 0;
        }
        
        return nextClaimTime - block.timestamp;
    }
    
    /**
     * @dev 获取用户项目状态
     * @param _user 用户地址
     * @param _projectId 项目ID
     * @return registered 是否注册
     * @return completedTasks 已完成任务数
     * @return score 分数
     * @return hasClaimedReward 是否已领取奖励
     * @return hasClaimedNFT 是否已铸造NFT
     */
    function getUserProjectStatus(address _user, string calldata _projectId) external view returns (
        bool registered,
        uint256 completedTasks,
        uint256 score,
        bool hasClaimedReward,
        bool hasClaimedNFT
    ) {
        UserProjectStatus memory status = userProjects[_user][_projectId];
        return (
            status.registered,
            status.completedTasks,
            status.score,
            status.hasClaimedReward,
            status.hasClaimedNFT
        );
    }
    
    /**
     * @dev 获取项目数量
     * @return 项目数量
     */
    function getProjectCount() external view returns (uint256) {
        return projects.length;
    }
    
    /**
     * @dev 获取项目信息
     * @param _projectId 项目ID
     * @return id 项目ID
     * @return name 项目名称
     * @return description 项目描述
     * @return startTime 开始时间
     * @return endTime 结束时间
     * @return rewardAmount 奖励数量
     * @return status 项目状态
     * @return requiredTaskCount 所需任务数
     * @return passingScore 及格分数
     */
    function getProjectDetails(string calldata _projectId) external view returns (
        string memory id,
        string memory name,
        string memory description,
        uint256 startTime,
        uint256 endTime,
        uint256 rewardAmount,
        ProjectStatus status,
        uint256 requiredTaskCount,
        uint256 passingScore
    ) {
        uint256 projectIndex = getProjectIndex(_projectId);
        Project memory project = projects[projectIndex];
        return (
            project.id,
            project.name,
            project.description,
            project.startTime,
            project.endTime,
            project.rewardAmount,
            project.status,
            project.requiredTaskCount,
            project.passingScore
        );
    }
    
    /**
     * @dev 检索项目索引
     * @param _projectId 项目ID
     * @return 项目索引
     */
    function getProjectIndex(string calldata _projectId) public view returns (uint256) {
        uint256 index = projectIdToIndex[_projectId];
        require(index > 0, "item does not exist");
        return index - 1;
    }

    /**
     * @dev 紧急取回合约中的代币（仅限合约拥有者）
     * @param amount 取回数量
     */
    function emergencyWithdraw(uint256 amount) external onlyOwner {
        require(amount > 0, "Quantity must be greater than 0");
        uint256 balance = cfcToken.balanceOf(address(this));
        require(amount <= balance, "not sufficient funds");
        
        cfcToken.safeTransfer(owner(), amount);
    }
} 