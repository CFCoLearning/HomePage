import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useChainId } from "wagmi";
import { formatUnits } from "viem";
import { useState, useEffect } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { REWARD_TOKEN_CONTRACT, getContractAddress } from "../contracts/contract-config";
import RewardTokenABI from "../contracts/RewardToken.json";
import { sepolia } from "wagmi/chains";

export function useRewardToken() {
  const { address, isConnected } = useAppKitAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // 获取当前链ID
  const currentChainId = useChainId();
  
  // 检查是否在Sepolia测试网上
  const isSepoliaNetwork = currentChainId === sepolia.id;
  
  // 获取合约地址
  const contractAddress = isSepoliaNetwork 
    ? getContractAddress(REWARD_TOKEN_CONTRACT, sepolia.id) 
    : undefined;
  
  // 读取可用奖励数量
  const { data: availableRewards, refetch: refetchAvailableRewards } = useReadContract({
    address: contractAddress,
    abi: RewardTokenABI,
    functionName: "availableRewards",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(isConnected && address && contractAddress && isSepoliaNetwork),
      staleTime: 10_000,
    }
  });
  
  // 读取上次领取时间
  const { data: lastClaimTime, refetch: refetchLastClaimTime } = useReadContract({
    address: contractAddress,
    abi: RewardTokenABI,
    functionName: "lastClaimTime",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(isConnected && address && contractAddress && isSepoliaNetwork),
      staleTime: 10_000,
    }
  });
  
  // 领取奖励
  const { writeContract, data: hash, isPending } = useWriteContract();
  
  // 等待交易完成
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ 
    hash,
  });
  
  // 处理领取奖励
  const claimRewards = async () => {
    if (!isConnected || !address) {
      setErrorMessage("请先连接您的钱包");
      return;
    }
    
    if (!isSepoliaNetwork) {
      setErrorMessage("请切换到Sepolia测试网");
      return;
    }
    
    if (!contractAddress) {
      setErrorMessage("合约地址未配置");
      return;
    }
    
    try {
      setIsLoading(true);
      setErrorMessage(null);
      writeContract({
        address: contractAddress,
        abi: RewardTokenABI,
        functionName: "claimRewards",
      });
    } catch (error) {
      console.error("领取奖励失败:", error);
      setErrorMessage("领取奖励时出现错误，请稍后再试");
      setIsLoading(false);
    }
  };
  
  // 监听交易状态
  useEffect(() => {
    if (isSuccess) {
      // 刷新数据
      refetchAvailableRewards();
      refetchLastClaimTime();
      setIsLoading(false);
    }
  }, [isSuccess, refetchAvailableRewards, refetchLastClaimTime]);
  
  // 格式化代币金额
  const formatTokenAmount = (amount: bigint | undefined, decimals = 18) => {
    if (!amount) return "0";
    return formatUnits(amount, decimals);
  };
  
  return {
    availableRewards: availableRewards ? formatTokenAmount(availableRewards as bigint) : "0",
    lastClaimTime: lastClaimTime ? Number(lastClaimTime) : 0,
    claimRewards,
    isLoading: isLoading || isPending || isConfirming,
    isSuccess,
    errorMessage,
    isSepoliaNetwork,
  };
} 