import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useChainId } from "wagmi";
import { formatUnits, parseUnits } from "viem";
import { useState, useEffect } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { sepolia } from "wagmi/chains";
import ERC20_ABI from "../contracts/CFCToken.json";
import { CFC_TOKEN_CONTRACT, getContractAddress } from "../contracts/contract-config";


/**
 * 使用ERC20代币的钩子函数
 * @param contractAddress ERC20代币合约地址
 * @returns 代币相关函数和状态
 */
export function useERC20Token() {
  const { address, isConnected } = useAppKitAccount();
  const chainId = useChainId();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tokenInfo, setTokenInfo] = useState<{
    name: string | undefined;
    symbol: string | undefined;
    decimals: number;
  }>({
    name: undefined,
    symbol: undefined,
    decimals: 18,
  });

  // 检查网络是否是Sepolia
  const isSepoliaNetwork = chainId === sepolia.id;

    // 获取合约地址
    const contractAddress = isSepoliaNetwork 
    ? getContractAddress(CFC_TOKEN_CONTRACT, sepolia.id) 
    : undefined;

  // 读取代币名称
  const { data: tokenName } = useReadContract({
    address: contractAddress,
    abi: ERC20_ABI,
    functionName: "name",
    query: {
      enabled: Boolean(isConnected && contractAddress && isSepoliaNetwork),
    },
  });

  // 读取代币符号
  const { data: tokenSymbol } = useReadContract({
    address: contractAddress,
    abi: ERC20_ABI,
    functionName: "symbol",
    query: {
      enabled: Boolean(isConnected && contractAddress && isSepoliaNetwork),
    },
  });

  // 读取代币精度
  const { data: tokenDecimals } = useReadContract({
    address: contractAddress,
    abi: ERC20_ABI,
    functionName: "decimals",
    query: {
      enabled: Boolean(isConnected && contractAddress && isSepoliaNetwork),
    },
  });

  // 更新代币信息
  useEffect(() => {
    if (tokenName || tokenSymbol || tokenDecimals !== undefined) {
      setTokenInfo({
        name: tokenName as string | undefined,
        symbol: tokenSymbol as string | undefined,
        decimals: tokenDecimals !== undefined ? Number(tokenDecimals) : 18,
      });
    }
  }, [tokenName, tokenSymbol, tokenDecimals]);

  // 读取用户余额
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: contractAddress,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(isConnected && address && contractAddress && isSepoliaNetwork),
      staleTime: 10_000,
    },
  });

  // 读取授权额度
  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: contractAddress,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: address && contractAddress ? [address, contractAddress] : undefined,
    query: {
      enabled: Boolean(isConnected && address && contractAddress && isSepoliaNetwork),
      staleTime: 10_000,
    },
  });

  // 转账相关
  const { writeContract, data: transferHash, isPending: isTransferPending } = useWriteContract();
  
  // 授权相关
  const { writeContract: writeApprove, data: approveHash, isPending: isApprovePending } = useWriteContract();

  // 等待交易完成
  const { isLoading: isTransferConfirming, isSuccess: isTransferSuccess } = useWaitForTransactionReceipt({ 
    hash: transferHash,
  });

  const { isLoading: isApproveConfirming, isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({ 
    hash: approveHash,
  });

  // 转账函数
  const transfer = async (to: `0x${string}`, amount: string) => {
    if (!isConnected || !address) {
      setErrorMessage("请先连接您的钱包");
      return;
    }
    
    if (!isSepoliaNetwork) {
      setErrorMessage("请切换到Sepolia测试网");
      return;
    }
    
    if (!contractAddress) {
      setErrorMessage("合约地址无效");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      
      // 将金额转换为合约所需的格式，考虑代币精度
      const amountInWei = parseUnits(amount, tokenInfo.decimals);
      
      writeContract({
        address: contractAddress,
        abi: ERC20_ABI,
        functionName: "transfer",
        args: [to, amountInWei],
      });
    } catch (error) {
      console.error("转账失败:", error);
      setErrorMessage("转账失败，请稍后再试");
      setIsLoading(false);
    }
  };

  // 授权函数
  const approve = async (spender: `0x${string}`, amount: string) => {
    if (!isConnected || !address) {
      setErrorMessage("请先连接您的钱包");
      return;
    }
    
    if (!isSepoliaNetwork) {
      setErrorMessage("请切换到Sepolia测试网");
      return;
    }
    
    if (!contractAddress) {
      setErrorMessage("合约地址无效");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      
      // 将金额转换为合约所需的格式，考虑代币精度
      const amountInWei = parseUnits(amount, tokenInfo.decimals);
      
      writeApprove({
        address: contractAddress,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [spender, amountInWei],
      });
    } catch (error) {
      console.error("授权失败:", error);
      setErrorMessage("授权失败，请稍后再试");
      setIsLoading(false);
    }
  };

  // 监听交易状态
  useEffect(() => {
    if (isTransferSuccess || isApproveSuccess) {
      // 刷新数据
      refetchBalance();
      refetchAllowance();
      setIsLoading(false);
    }
  }, [isTransferSuccess, isApproveSuccess, refetchBalance, refetchAllowance]);

  // 格式化代币金额
  const formatTokenAmount = (amount: bigint | undefined) => {
    if (!amount) return "0";
    return formatUnits(amount, tokenInfo.decimals);
  };

  return {
    // 代币信息
    tokenName: tokenInfo.name,
    tokenSymbol: tokenInfo.symbol,
    tokenDecimals: tokenInfo.decimals,
    
    // 余额
    balance: balance ? formatTokenAmount(balance as bigint) : "0",
    allowance: allowanceData ? formatTokenAmount(allowanceData as bigint) : "0",
    
    // 操作函数
    transfer,
    approve,
    refetchBalance,
    refetchAllowance,
    
    // 状态
    isLoading: isLoading || isTransferPending || isTransferConfirming || isApprovePending || isApproveConfirming,
    isTransferSuccess,
    isApproveSuccess,
    errorMessage,
    isSepoliaNetwork,
  };
} 