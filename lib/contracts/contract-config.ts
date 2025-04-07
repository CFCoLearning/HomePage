import { mainnet, sepolia } from "wagmi/chains";
import { Address } from "viem";

interface ContractConfig {
  address: Record<number, Address>;
  name: string;
}

export const REWARD_TOKEN_CONTRACT: ContractConfig = {
  name: "CrazyForCode CoLearning",
  address: {
    [mainnet.id]: "0x1234567890123456789012345678901234567890", // 主网测试地址，实际部署时更换
    [sepolia.id]: "0x3e61503D6504F5f72Fc46a04229048e96d5F9089", // Sepolia测试网地址，实际部署时更换
  },
};

export const CFC_TOKEN_CONTRACT: ContractConfig = {
    name: "CrazyForCode Token",
    address: {
      [mainnet.id]: "0x1234567890123456789012345678901234567890", // 主网测试地址，实际部署时更换
      [sepolia.id]: "0x7c0de9efd6edf521d71bbd4085728b8771a3f675", // Sepolia测试网地址，实际部署时更换
    },
  };

export const CFC_NFT_CONTRACT: ContractConfig = {
  name: "CrazyForCode NFT",
  address: {
    [mainnet.id]: "0x1234567890123456789012345678901234567890", // 主网测试地址，实际部署时更换
    [sepolia.id]: "0x7c0de9efd6edf521d71bbd4085728b8771a3f675", // Sepolia测试网地址，实际部署时更换
  },
};

export function getContractAddress(
  contract: ContractConfig,
  chainId: number
): Address | undefined {
  return contract.address[chainId];
} 