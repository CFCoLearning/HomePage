// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./CFCNFT.sol";
import "./CFCToken.sol";

/**
 * @title ProjectManager
 * @dev 管理社区学习项目及用户完成状态
 * 验证用户铸造NFT的资格，并在用户完成项目时发放奖励
 */
contract ProjectManager is Ownable {
    // NFT合约地址
    CFCNFT public nftContract;
    
    // 代币合约地址
    CFCToken public tokenContract;
    
    // 项目状态
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
    event ProjectCreated(string indexed projectId, string name, uint256 startTime, uint256 endTime);
    event ProjectUpdated(string indexed projectId, ProjectStatus status);
    event UserRegistered(address indexed user, string indexed projectId);
    event TaskCompleted(address indexed user, string indexed projectId, uint256 taskCount);
    event ProjectScoreUpdated(address indexed user, string indexed projectId, uint256 score);
    event RewardClaimed(address indexed user, string indexed projectId, uint256 amount);
    event NFTClaimed(address indexed user, string indexed projectId, uint256 tokenId);
    
    /**
     * @dev 构造函数
     */
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev 设置NFT合约地址
     * @param _nftContract NFT合约地址
     */
    function setNFTContract(address _nftContract) external onlyOwner {
        nftContract = CFCNFT(_nftContract);
    }
    
    /**
     * @dev 设置代币合约地址
     * @param _tokenContract 代币合约地址
     */
    function setTokenContract(address _tokenContract) external onlyOwner {
        tokenContract = CFCToken(_tokenContract);
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
        require(bytes(_id).length > 0, "项目ID不能为空");
        require(_endTime > _startTime, "结束时间必须晚于开始时间");
        require(_passingScore <= 100, "及格分数不能超过100%");
        require(projectIdToIndex[_id] == 0, "项目ID已存在");
        
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
     * @param _projectId 项目ID
     */
    function registerForProject(string calldata _projectId) external {
        uint256 projectIndex = getProjectIndex(_projectId);
        Project memory project = projects[projectIndex];
        
        require(project.status == ProjectStatus.ACTIVE, "项目不处于活跃状态");
        require(block.timestamp >= project.startTime, "项目尚未开始");
        require(block.timestamp <= project.endTime, "项目已结束");
        require(!userProjects[msg.sender][_projectId].registered, "已注册此项目");
        
        userProjects[msg.sender][_projectId] = UserProjectStatus({
            registered: true,
            completedTasks: 0,
            score: 0,
            hasClaimedReward: false,
            hasClaimedNFT: false
        });
        
        emit UserRegistered(msg.sender, _projectId);
    }
    
    /**
     * @dev 更新用户完成的任务数量(由管理员调用)
     * @param _user 用户地址
     * @param _projectId 项目ID
     * @param _taskCount 已完成任务数
     */
    function updateCompletedTasks(address _user, string calldata _projectId, uint256 _taskCount) external onlyOwner {
        require(userProjects[_user][_projectId].registered, "用户未注册此项目");
        
        uint256 projectIndex = getProjectIndex(_projectId);
        Project memory project = projects[projectIndex];
        
        require(_taskCount <= project.requiredTaskCount, "完成任务数不能超过要求");
        
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
        require(userProjects[_user][_projectId].registered, "用户未注册此项目");
        require(_score <= 100, "分数不能超过100");
        
        userProjects[_user][_projectId].score = _score;
        
        emit ProjectScoreUpdated(_user, _projectId, _score);
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
     */
    function claimProjectReward(string calldata _projectId) external {
        uint256 projectIndex = getProjectIndex(_projectId);
        Project memory project = projects[projectIndex];
        
        require(userProjects[msg.sender][_projectId].registered, "未注册此项目");
        require(userProjects[msg.sender][_projectId].score >= project.passingScore, "未达到及格分数");
        require(!userProjects[msg.sender][_projectId].hasClaimedReward, "已领取奖励");
        require(address(tokenContract) != address(0), "代币合约未设置");
        
        userProjects[msg.sender][_projectId].hasClaimedReward = true;
        
        // 发放代币奖励
        tokenContract.mint(msg.sender, project.rewardAmount);
        
        emit RewardClaimed(msg.sender, _projectId, project.rewardAmount);
    }
    
    /**
     * @dev 用户铸造项目完成NFT
     * @param _projectId 项目ID
     * @return tokenId 铸造的NFT ID
     */
    function mintProjectNFT(string calldata _projectId) external returns (uint256) {
        uint256 projectIndex = getProjectIndex(_projectId);
        Project memory project = projects[projectIndex];
        
        require(userProjects[msg.sender][_projectId].registered, "未注册此项目");
        require(userProjects[msg.sender][_projectId].score >= project.passingScore, "未达到及格分数");
        require(!userProjects[msg.sender][_projectId].hasClaimedNFT, "已铸造NFT");
        require(address(nftContract) != address(0), "NFT合约未设置");
        
        userProjects[msg.sender][_projectId].hasClaimedNFT = true;
        
        // 铸造NFT
        uint256 tokenId = nftContract.mintNFT(msg.sender, _projectId);
        
        emit NFTClaimed(msg.sender, _projectId, tokenId);
        
        return tokenId;
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
     * @dev 检索项目索引
     * @param _projectId 项目ID
     * @return 项目索引
     */
    function getProjectIndex(string calldata _projectId) public view returns (uint256) {
        uint256 index = projectIdToIndex[_projectId];
        require(index > 0, "项目不存在");
        return index - 1;
    }
} 