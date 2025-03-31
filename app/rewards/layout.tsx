"use client";

import { useEffect, useState } from "react";
import { useAppKit } from "@reown/appkit/react";
import { useAppKitAccount } from "@reown/appkit/react";
import { useChainId } from "wagmi";
import { sepolia } from "wagmi/chains";

export default function RewardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open } = useAppKit();
  const { isConnected } = useAppKitAccount();
  const chainId = useChainId();
  const [showNetworkAlert, setShowNetworkAlert] = useState(false);

  // 检查网络是否是Sepolia
  useEffect(() => {
    // 只有当用户已连接钱包时才显示网络提示
    if (isConnected && chainId && chainId !== sepolia.id) {
      setShowNetworkAlert(true);
    } else {
      setShowNetworkAlert(false);
    }
  }, [chainId, isConnected]);

  // 手动添加Sepolia网络
  const addSepoliaNetwork = async () => {
    // 检查window.ethereum是否可用
    if (typeof window !== "undefined" && "ethereum" in window) {
      try {
        // 请求添加Sepolia测试网络
        await (window as any).ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xaa36a7", // 十六进制形式的链ID
              chainName: "Sepolia Testnet",
              nativeCurrency: {
                name: "Sepolia ETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://eth-sepolia.g.alchemy.com/v2/demo"],
              blockExplorerUrls: ["https://sepolia.etherscan.io"],
            },
          ],
        });
        console.log("Sepolia网络添加成功");
      } catch (error) {
        console.error("添加Sepolia网络失败:", error);
      }
    } else {
      console.error(
        "未检测到以太坊提供程序，请确保已安装MetaMask或其他兼容钱包"
      );
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* 网络提示 */}
      {showNetworkAlert && (
        <div className="fixed top-20 left-0 right-0 z-50 mx-auto max-w-md px-4">
          <div className="bg-amber-900/70 backdrop-blur-md border border-amber-500/30 rounded-lg p-4 flex flex-col items-center shadow-lg">
            <p className="text-amber-200 text-center mb-3">
              请切换到Sepolia测试网以访问奖励功能
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => open({ view: "Networks" })}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
              >
                使用钱包选择
              </button>
              <button
                onClick={addSepoliaNetwork}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                直接添加网络
              </button>
            </div>
            <div className="mt-3 text-xs text-amber-300/80 text-center">
              如果添加失败，请尝试手动添加网络或刷新页面
            </div>
          </div>
        </div>
      )}

      {/* 背景装饰 - 动态粒子版本 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 主要背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20" />

        {/* 网格图案 - 区块链风格 */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[url('/images/grid-pattern.svg')] bg-repeat bg-[length:40px_40px]" />
        </div>

        {/* 动态光晕效果 */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[120px] animate-pulse-slow animation-delay-2000" />

        {/* 右上角 - 代表代币/奖励的光效 */}
        <div className="absolute top-10 right-10 w-60 h-60 rounded-full bg-yellow-400/5 blur-3xl animate-pulse-slow" />

        {/* 左下角 - 小粒子区域 */}
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl animate-float" />

        {/* 粒子动画区 - 左侧 */}
        <div className="absolute top-1/2 left-20 w-4 h-4 bg-blue-400/40 rounded-full blur-sm animate-particle-1" />
        <div className="absolute top-[45%] left-40 w-2 h-2 bg-blue-300/30 rounded-full blur-sm animate-particle-2" />
        <div className="absolute top-[55%] left-60 w-3 h-3 bg-blue-500/30 rounded-full blur-sm animate-particle-3" />
        <div className="absolute top-[35%] left-32 w-2 h-2 bg-cyan-400/30 rounded-full blur-sm animate-particle-4" />
        <div className="absolute top-[65%] left-28 w-3 h-3 bg-indigo-400/30 rounded-full blur-sm animate-particle-2" />

        {/* 粒子动画区 - 右侧 */}
        <div className="absolute top-1/3 right-24 w-3 h-3 bg-purple-400/40 rounded-full blur-sm animate-particle-3" />
        <div className="absolute top-[38%] right-48 w-2 h-2 bg-purple-300/30 rounded-full blur-sm animate-particle-1" />
        <div className="absolute top-[42%] right-72 w-4 h-4 bg-purple-500/30 rounded-full blur-sm animate-particle-2" />
        <div className="absolute top-[28%] right-36 w-2 h-2 bg-fuchsia-400/30 rounded-full blur-sm animate-particle-4" />
        <div className="absolute top-[50%] right-56 w-3 h-3 bg-violet-400/30 rounded-full blur-sm animate-particle-1" />

        {/* 粒子连接线 - 模拟区块链节点连接 (使用绝对定位的伪元素模拟连接) */}
        <div className="absolute top-[30%] left-1/3 w-[2px] h-20 bg-gradient-to-b from-blue-500/0 via-blue-500/10 to-blue-500/0 rotate-[30deg] animate-fade-in-out" />
        <div className="absolute top-[40%] right-1/4 w-[2px] h-24 bg-gradient-to-b from-purple-500/0 via-purple-500/10 to-purple-500/0 -rotate-[45deg] animate-fade-in-out animation-delay-1000" />
        <div className="absolute top-[60%] left-1/2 w-[3px] h-32 bg-gradient-to-b from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 rotate-[15deg] animate-fade-in-out animation-delay-2000" />

        {/* 区块节点 - 大型节点 */}
        <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-blue-400/20 rounded-md animate-rotate-slow">
          <div className="absolute inset-0.5 bg-blue-400/20 rounded-sm rotate-45"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-purple-400/20 rounded-md animate-rotate-slow animation-delay-1500">
          <div className="absolute inset-1 bg-purple-400/20 rounded-sm rotate-45"></div>
        </div>
        <div className="absolute top-2/3 left-2/3 w-7 h-7 bg-cyan-400/20 rounded-md animate-rotate-slow animation-delay-3000">
          <div className="absolute inset-0.5 bg-cyan-400/20 rounded-sm -rotate-45"></div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
