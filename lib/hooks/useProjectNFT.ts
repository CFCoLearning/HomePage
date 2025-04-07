import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useChainId } from "wagmi";
import { formatUnits } from "viem";
import { useState, useEffect } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { sepolia } from "wagmi/chains";
import { ProjectDetails } from "@/data/projects";
import NFT_ABI from "@/lib/contracts/CFCNFT.json";
import PROJECT_MANAGER_ABI from "@/lib/contracts/RewardToken.json";
import { CFC_NFT_CONTRACT, REWARD_TOKEN_CONTRACT } from "@/lib/contracts/contract-config";


const NFT_ADDRESS = CFC_NFT_CONTRACT.address[sepolia.id];
const PROJECT_MANAGER_ADDRESS = REWARD_TOKEN_CONTRACT.address[sepolia.id];

export interface ProjectNFTStatus {
  projectId: string;
  projectName: string;
  registered: boolean;
  completedTasks: number;
  totalTasks: number | null;
  score: number;
  passingScore: number | null;
  canMint: boolean;
  hasMinted: boolean;
  hasClaimedReward: boolean;
}

/**
 * 使用项目NFT的钩子函数
 * @returns 项目NFT相关函数和状态
 */
export function useProjectNFT() {
  const { address, isConnected } = useAppKitAccount();
  const chainId = useChainId();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [projectsStatus, setProjectsStatus] = useState<ProjectNFTStatus[]>([{
    projectId: "1",
    projectName: "The-Missing-Semester",
    registered: false,
    completedTasks: 20,
    totalTasks: 21,
    score: 90,
    passingScore: null,
    canMint: true,
    hasMinted: true,
    hasClaimedReward: true,
  },
  {
    projectId: "2",
    projectName: "Full-Stack-Bootcamp",
    registered: false,
    completedTasks: 15,
    totalTasks: 21,
    score: 60,
    passingScore: null,
    canMint: true,
    hasMinted: false,
    hasClaimedReward: false,
  },]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projectToCheck, setProjectToCheck] = useState<{ id: string, name: string } | null>(null);

  // 检查网络是否是Sepolia
  const isSepoliaNetwork = chainId === sepolia.id;

  // 读取合约数据
  const { data: projectStatus, refetch: refetchProjectStatus } = useReadContract({
    address: PROJECT_MANAGER_ADDRESS,
    abi: PROJECT_MANAGER_ABI,
    functionName: "getUserProjectStatus",
    args: address && projectToCheck ? [address, projectToCheck.id] : undefined,
  });

  const { data: hasMinted, refetch: refetchHasMinted } = useReadContract({
    address: NFT_ADDRESS,
    abi: NFT_ABI,
    functionName: "hasMinted",
    args: address && projectToCheck ? [address, projectToCheck.id] : undefined,
  });

  const { data: canMint, refetch: refetchCanMint } = useReadContract({
    address: PROJECT_MANAGER_ADDRESS,
    abi: PROJECT_MANAGER_ABI,
    functionName: "canMintNFT",
    args: address && projectToCheck ? [address, projectToCheck.id] : undefined,
  });

  // 读取单个项目状态
  // const processProjectData = () => {
  //   if (!projectToCheck || !projectStatus) return null;

  //   try {
  //     const [registered, completedTasks, score, hasClaimedReward, hasClaimedNFT] = projectStatus as [boolean, bigint, bigint, boolean, boolean];

  //     return {
  //       projectId: projectToCheck.id,
  //       projectName: projectToCheck.name,
  //       registered,
  //       completedTasks: Number(completedTasks),
  //       totalTasks: null, // 从项目管理合约获取
  //       score: Number(score),
  //       passingScore: null, // 从项目管理合约获取
  //       canMint: Boolean(canMint),
  //       hasMinted: Boolean(hasMinted) || hasClaimedNFT,
  //       hasClaimedReward
  //     };
  //   } catch (error) {
  //     console.error("处理项目数据失败:", error);
  //     return null;
  //   }
  // };

  // // 当项目数据更新时处理结果
  // useEffect(() => {
  //   const projectData = processProjectData();
  //   if (projectData) {
  //     setProjectsStatus(prev => {
  //       // 更新或添加项目数据
  //       const existingIndex = prev.findIndex(p => p.projectId === projectData.projectId);
  //       if (existingIndex >= 0) {
  //         const updated = [...prev];
  //         updated[existingIndex] = projectData;
  //         return updated;
  //       } else {
  //         return [...prev, projectData];
  //       }
  //     });
  //   }
  // }, [projectStatus, hasMinted, canMint]);

  // // 读取所有项目状态
  // const fetchAllProjectsStatus = async () => {
  //   if (!address || !isConnected || !isSepoliaNetwork) return;

  //   setIsLoading(true);
  //   setErrorMessage(null);
  //   setProjectsStatus([]);

  //   try {
  //     // 从projects数据中获取项目列表
  //     for (const project of ProjectDetails) {
  //       // 设置当前检查的项目
  //       setProjectToCheck({ id: project.id, name: project.title });

  //       // 触发合约数据刷新
  //       await Promise.all([
  //         refetchProjectStatus(),
  //         refetchHasMinted(),
  //         refetchCanMint()
  //       ]);

  //       // 等待一小段时间以确保数据更新
  //       await new Promise(resolve => setTimeout(resolve, 300));
  //     }
  //   } catch (error) {
  //     console.error("获取所有项目状态失败:", error);
  //     setErrorMessage("获取项目状态失败，请稍后再试");
  //   } finally {
  //     setIsLoading(false);
  //     setProjectToCheck(null);
  //   }
  // };

  // // 铸造NFT相关
  // const { writeContract, data: mintHash, isPending: isMintPending } = useWriteContract();

  // // 等待交易完成
  // const { isLoading: isMintConfirming, isSuccess: isMintSuccess } = useWaitForTransactionReceipt({ 
  //   hash: mintHash,
  // });

  // // 铸造NFT函数
  // const mintProjectNFT = async (projectId: string) => {
  //   if (!isConnected || !address) {
  //     setErrorMessage("请先连接您的钱包");
  //     return;
  //   }

  //   if (!isSepoliaNetwork) {
  //     setErrorMessage("请切换到Sepolia测试网");
  //     return;
  //   }

  //   try {
  //     setIsLoading(true);
  //     setErrorMessage(null);
  //     setSelectedProjectId(projectId);

  //     // 调用项目管理合约铸造NFT
  //     writeContract({
  //       address: PROJECT_MANAGER_ADDRESS,
  //       abi: PROJECT_MANAGER_ABI,
  //       functionName: "mintProjectNFT",
  //       args: [projectId],
  //     });
  //   } catch (error) {
  //     console.error("铸造NFT失败:", error);
  //     setErrorMessage("铸造NFT失败，请稍后再试");
  //     setIsLoading(false);
  //     setSelectedProjectId(null);
  //   }
  // };

  // // 监听交易状态
  // useEffect(() => {
  //   if (isMintSuccess && selectedProjectId) {
  //     // 刷新数据
  //     fetchAllProjectsStatus();
  //     setSelectedProjectId(null);
  //     setIsLoading(false);
  //   }
  // }, [isMintSuccess, selectedProjectId]);

  // // 首次加载时获取所有项目状态
  // useEffect(() => {
  //   if (isConnected && address && isSepoliaNetwork) {
  //     fetchAllProjectsStatus();
  //   }
  // }, [isConnected, address, isSepoliaNetwork]);

  return {
    // 项目状态
    projectsStatus,
    selectedProjectId,

    // 操作函数
    // mintProjectNFT,
    // refreshProjectsStatus: fetchAllProjectsStatus,

    // // 状态
    // isLoading: isLoading || isMintPending || isMintConfirming,
    // isMintSuccess,
    errorMessage,
    isSepoliaNetwork,
  };
} 