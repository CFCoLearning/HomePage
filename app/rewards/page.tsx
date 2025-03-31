"use client";

import { useState, useEffect } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKit } from "@reown/appkit/react";
import { useRewardToken } from "@/lib/hooks/useRewardToken";
import { useERC20Token } from "@/lib/hooks/useERC20Token";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Coins, History, Wallet, ChevronRight, Gift, Clock, ExternalLink, Plus, Info } from "lucide-react";
import { sepolia } from "wagmi/chains";

export default function RewardsPage() {
  const { isConnected, address } = useAppKitAccount();
  const { open } = useAppKit();
  const { 
    availableRewards, 
    lastClaimTime, 
    claimRewards, 
    isLoading, 
    isSuccess,
    errorMessage,
    isSepoliaNetwork
  } = useRewardToken();
  const {
    balance,
  } = useERC20Token();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showNetworkInfo, setShowNetworkInfo] = useState(false);
  const [switchError, setSwitchError] = useState<string | null>(null);
  
  // 处理成功领取后的提示
  useEffect(() => {
    if (isSuccess) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);
  
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
        请先连接您的钱包以查看和领取奖励代币
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
        CFC 奖励仅在 Sepolia 测试网上可用，请切换您的钱包网络
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
          disabled={isLoading || Number(availableRewards) <= 0}
          className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center
            ${Number(availableRewards) > 0 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-700/30 text-gray-500 cursor-not-allowed'}`}
        >
          {isLoading ? (
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

  // 渲染合适的内容
  const renderContent = () => {
    if (!isConnected) {
      return renderConnectWalletPrompt();
    } else if (!isSepoliaNetwork) {
      return renderNetworkSwitchPrompt();
    } else {
      return renderRewardsCard();
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
            参与社区活动和贡献代码，获取 CFC 代币奖励。这些代币可用于社区治理和解锁特殊功能。
          </p>
        </div>
        
        {/* 动态内容区域 */}
        {renderContent()}
        
        {/* 错误信息 */}
        {errorMessage && (
          <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-300">
            {errorMessage}
          </div>
        )}
        
        {/* 成功信息 */}
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
        
        {/* 奖励说明 */}
        <div className="mt-12 bg-gray-800/20 rounded-xl p-6 border border-gray-700/30">
          <h2 className="text-xl font-semibold text-white mb-4">如何获取更多奖励</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-400 text-sm font-bold">1</span>
              </div>
              <div>
                <p className="text-gray-300">参与 Hackathon 活动</p>
                <p className="text-sm text-gray-500">根据项目完成情况和评分，获得相应的代币奖励。</p>
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