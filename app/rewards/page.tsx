"use client";

import { useState, useEffect } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKit } from "@reown/appkit/react";
import { useRewardToken } from "@/lib/hooks/useRewardToken";
import { useERC20Token } from "@/lib/hooks/useERC20Token";
import { useProjectNFT } from "@/lib/hooks/useProjectNFT";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Coins, History, Wallet, ChevronRight, Gift, Clock, ExternalLink, Plus, Info, Award, CheckCircle, XCircle, Medal } from "lucide-react";
import { sepolia } from "wagmi/chains";

export default function RewardsPage() {
  const { isConnected, address } = useAppKitAccount();
  const { open } = useAppKit();
  const { 
    availableRewards, 
    lastClaimTime, 
    claimRewards, 
    isLoading: isRewardLoading, 
    isSuccess: isRewardSuccess,
    errorMessage: rewardErrorMessage,
    isSepoliaNetwork
  } = useRewardToken();
  const {
    balance,
  } = useERC20Token();
  const {
    projectsStatus,
    mintProjectNFT,
    isLoading: isNFTLoading,
    isMintSuccess,
    errorMessage: nftErrorMessage,
  } = useProjectNFT();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showNetworkInfo, setShowNetworkInfo] = useState(false);
  const [switchError, setSwitchError] = useState<string | null>(null);
  const [showNFTSuccess, setShowNFTSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'rewards' | 'nfts'>('rewards');
  
  // 处理成功领取后的提示
  useEffect(() => {
    if (isRewardSuccess) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isRewardSuccess]);
  
  // 处理NFT铸造成功提示
  useEffect(() => {
    if (isMintSuccess) {
      setShowNFTSuccess(true);
      const timer = setTimeout(() => {
        setShowNFTSuccess(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isMintSuccess]);
  
  // 处理错误信息
  useEffect(() => {
    if (rewardErrorMessage) {
      setErrorMsg(rewardErrorMessage);
    } else if (nftErrorMessage) {
      setErrorMsg(nftErrorMessage);
    } else {
      setErrorMsg(null);
    }
  }, [rewardErrorMessage, nftErrorMessage]);
  
  // 格式化上次领取时间
  const formattedLastClaimTime = lastClaimTime ? 
    formatDistanceToNow(new Date(lastClaimTime * 1000), { addSuffix: true, locale: zhCN }) : 
    "从未领取";

  // 处理钱包连接
  const handleConnectWallet = () => {
    open();
  };

  // 处理网络切换
  const handleSwitchNetwork = () => {
    setSwitchError(null);
    open({ view: "Networks" });
  };

  // 手动添加Sepolia网络
  const addSepoliaNetwork = async () => {
    try {
      setSwitchError(null);
      if (typeof window !== 'undefined' && 'ethereum' in window) {
        await (window as any).ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0xaa36a7', // 十六进制形式的链ID
              chainName: 'Sepolia Testnet',
              nativeCurrency: {
                name: 'Sepolia ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: ['https://endpoints.omniatech.io/v1/eth/sepolia/public'],
              blockExplorerUrls: ['https://sepolia.etherscan.io'],
            },
          ],
        });
        console.log('Sepolia网络添加成功');
      } else {
        setSwitchError("未检测到以太坊提供程序，请确保已安装MetaMask或其他兼容钱包");
      }
    } catch (error) {
      console.error('添加Sepolia网络失败:', error);
      setSwitchError("添加网络失败，请尝试手动添加或刷新页面");
    }
  };

  // 渲染连接钱包按钮
  const renderConnectWalletPrompt = () => (
    <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10">
      <Wallet className="w-16 h-16 text-blue-400 mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">连接您的钱包</h2>
      <p className="text-gray-400 text-center mb-6">
        请先连接您的钱包以查看和领取奖励代币以及项目成就NFT
      </p>
      <button 
        onClick={handleConnectWallet}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all duration-200 flex items-center"
      >
        连接钱包
        <ChevronRight className="ml-2 h-5 w-5" />
      </button>
    </div>
  );
  
  // 渲染网络切换提示
  const renderNetworkSwitchPrompt = () => (
    <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-500/10">
      <svg className="w-16 h-16 text-amber-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5v-3m0-10v3m7.5 7h-15" />
      </svg>
      <h2 className="text-2xl font-bold text-white mb-2">请切换至 Sepolia 测试网</h2>
      <p className="text-gray-400 text-center mb-6">
        CFC 奖励和项目NFT仅在 Sepolia 测试网上可用，请切换您的钱包网络
      </p>
      
      {/* 错误信息 */}
      {switchError && (
        <div className="mb-6 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-300 text-sm w-full text-center">
          {switchError}
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button 
          onClick={handleSwitchNetwork}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center"
        >
          选择网络
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
        
        <button 
          onClick={addSepoliaNetwork}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center"
        >
          直接添加网络
          <Plus className="ml-2 h-5 w-5" />
        </button>
      </div>
      
      <button
        onClick={() => setShowNetworkInfo(!showNetworkInfo)}
        className="flex items-center text-amber-400 hover:text-amber-300 transition-colors mb-3"
      >
        <Info className="w-4 h-4 mr-1" />
        {showNetworkInfo ? "隐藏详细信息" : "查看网络配置信息"}
      </button>
      
      {showNetworkInfo && (
        <div className="w-full p-4 bg-amber-900/20 border border-amber-500/20 rounded-lg text-sm text-amber-200">
          <h3 className="font-medium mb-2">Sepolia测试网配置信息：</h3>
          <ul className="space-y-1 text-amber-300/80">
            <li><span className="text-amber-200 font-medium">网络名称:</span> Sepolia</li>
            <li><span className="text-amber-200 font-medium">RPC URL:</span> https://eth-sepolia.g.alchemy.com/v2/demo</li>
            <li><span className="text-amber-200 font-medium">链ID (十进制):</span> 11155111</li>
            <li><span className="text-amber-200 font-medium">链ID (十六进制):</span> 0xaa36a7</li>
            <li><span className="text-amber-200 font-medium">货币符号:</span> ETH</li>
            <li><span className="text-amber-200 font-medium">区块浏览器:</span> https://sepolia.etherscan.io</li>
          </ul>
          <p className="mt-3 text-xs text-amber-300/70">复制上述信息到您的钱包App中手动添加网络</p>
        </div>
      )}
    </div>
  );
  
  // 渲染奖励卡片
  const renderRewardsCard = () => (
    <div className="grid md:grid-cols-2 gap-6">
      {/* 当前余额卡片 */}
      <div className="bg-gradient-to-br from-emerald-900/20 to-green-900/20 rounded-xl p-6 border border-emerald-500/20 flex flex-col">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-emerald-500/10 rounded-lg mr-3">
            <Wallet className="h-6 w-6 text-emerald-400" />
          </div>
          <h3 className="text-lg font-medium text-emerald-300">当前余额</h3>
        </div>
        <div className="flex-1 flex items-center justify-center my-4">
          <div className="text-4xl font-bold text-white flex items-baseline">
            <span>{balance}</span>
            <span className="text-sm text-gray-400 ml-2">CFC</span>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-4 pt-4 border-t border-gray-700/40">
          <div className="flex items-center">
            <History className="h-4 w-4 mr-1" />
            <span>上次领取:</span>
          </div>
          <span>{formattedLastClaimTime}</span>
        </div>
      </div>
      
      {/* 可用奖励卡片 */}
      <div className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 rounded-xl p-6 border border-blue-500/20 flex flex-col">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-blue-500/10 rounded-lg mr-3">
            <Gift className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-medium text-blue-300">可用奖励</h3>
        </div>
        <div className="flex-1 flex items-center justify-center my-4">
          <div className="text-4xl font-bold text-white flex items-baseline">
            <span>{availableRewards}</span>
            <span className="text-sm text-gray-400 ml-2">CFC</span>
          </div>
        </div>
        <button
          onClick={claimRewards}
          disabled={isRewardLoading || Number(availableRewards) <= 0}
          className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center
            ${Number(availableRewards) > 0 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-700/30 text-gray-500 cursor-not-allowed'}`}
        >
          {isRewardLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              处理中...
            </>
          ) : Number(availableRewards) > 0 ? (
            <>
              <Coins className="mr-2 h-4 w-4" />
              领取奖励
            </>
          ) : (
            <>
              <Clock className="mr-2 h-4 w-4" />
              暂无可领取奖励
            </>
          )}
        </button>
      </div>
    </div>
  );
  
  // 渲染NFT卡片
  const renderNFTCards = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">项目成就NFT</h3>
      
      {isNFTLoading && projectsStatus.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-400">加载项目数据中...</span>
        </div>
      ) : projectsStatus.length === 0 ? (
        <div className="text-center py-10 bg-gray-800/20 rounded-xl border border-gray-700/30">
          <Award className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">暂无项目数据</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            您尚未参与任何学习项目，或者项目数据正在同步中。参与社区学习项目后即可获得专属NFT成就。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsStatus.map((project) => (
            <div 
              key={project.projectId}
              className="bg-gray-800/20 rounded-xl border border-gray-700/30 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-white">{project.projectName}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">得分:</span>
                    <span className="text-sm font-medium text-white">{project.score}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">打卡天数:</span>
                    <span className="text-white">
                      {project.completedTasks}/{project.totalTasks || '?'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">NFT状态:</span>
                    {project.hasMinted ? (
                      <span className="text-green-400 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        已铸造
                      </span>
                    ) : project.canMint ? (
                      <span className="text-yellow-400 flex items-center">
                        <Medal className="h-4 w-4 mr-1" />
                        可铸造
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" />
                        未达标
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <button
                  onClick={() => mintProjectNFT(project.projectId)}
                  disabled={isNFTLoading || !project.canMint || project.hasMinted}
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center
                    ${project.canMint && !project.hasMinted
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-gray-700/30 text-gray-500 cursor-not-allowed'}`}
                >
                  {isNFTLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      处理中...
                    </>
                  ) : project.hasMinted ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      已铸造成就NFT
                    </>
                  ) : project.canMint ? (
                    <>
                      <Medal className="mr-2 h-4 w-4" />
                      领取成就NFT
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-2 h-4 w-4" />
                      未达到领取条件
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 bg-gray-800/20 rounded-xl p-5 border border-gray-700/30">
        <h3 className="text-lg font-medium text-white mb-3">关于成就NFT</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          成就NFT是对您完成社区学习项目的永久记录和认证。每个NFT代表您在特定项目中的参与和成就，
          并可作为您学习历程的证明。项目得分达到通过标准即可领取对应的专属NFT。
        </p>
      </div>
    </div>
  );

  // 渲染内容区域标签
  const renderTabs = () => (
    <div className="mb-8 border-b border-gray-800">
      <div className="flex space-x-6">
        <button
          onClick={() => setActiveTab('rewards')}
          className={`pb-3 px-1 font-medium transition-colors ${
            activeTab === 'rewards'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <div className="flex items-center">
            <Coins className="mr-2 h-5 w-5" />
            代币奖励
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('nfts')}
          className={`pb-3 px-1 font-medium transition-colors ${
            activeTab === 'nfts'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <div className="flex items-center">
            <Medal className="mr-2 h-5 w-5" />
            成就NFT
          </div>
        </button>
      </div>
    </div>
  );

  // 渲染合适的内容
  const renderContent = () => {
    if (!isConnected) {
      return renderConnectWalletPrompt();
    } else if (!isSepoliaNetwork) {
      return renderNetworkSwitchPrompt();
    } else {
      return (
        <>
          {renderTabs()}
          {activeTab === 'rewards' ? renderRewardsCard() : renderNFTCards()}
        </>
      );
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto">
        {/* 标题部分 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text mb-4">
            CFC 奖励中心
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            参与社区活动和贡献代码，获取 CFC 代币奖励和专属成就NFT。这些奖励证明了您的技能和贡献。
          </p>
        </div>
        
        {/* 动态内容区域 */}
        {renderContent()}
        
        {/* 错误信息 */}
        {errorMsg && (
          <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-300">
            {errorMsg}
          </div>
        )}
        
        {/* 成功信息 - 代币 */}
        {showSuccessMessage && (
          <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-300 flex items-center">
            <div className="mr-2 bg-green-500/20 p-1.5 rounded-full">
              <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            您已成功领取奖励代币！
          </div>
        )}
        
        {/* 成功信息 - NFT */}
        {showNFTSuccess && (
          <div className="mt-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg text-purple-300 flex items-center">
            <div className="mr-2 bg-purple-500/20 p-1.5 rounded-full">
              <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            您已成功铸造项目成就NFT！
          </div>
        )}
        
        {/* 奖励说明 */}
        <div className="mt-12 bg-gray-800/20 rounded-xl p-6 border border-gray-700/30">
          <h2 className="text-xl font-semibold text-white mb-4">如何获取更多奖励</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-400 text-sm font-bold">1</span>
              </div>
              <div>
                <p className="text-gray-300">参与共学项目</p>
                <p className="text-sm text-gray-500">完成社区共学项目任务，获得代币奖励和专属项目成就NFT。</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-400 text-sm font-bold">2</span>
              </div>
              <div>
                <p className="text-gray-300">贡献代码</p>
                <p className="text-sm text-gray-500">向我们的开源项目提交PR，审核通过后获得代币奖励。</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-400 text-sm font-bold">3</span>
              </div>
              <div>
                <p className="text-gray-300">参与社区讨论</p>
                <p className="text-sm text-gray-500">在社区中积极参与讨论，提供有价值的建议和反馈。</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 