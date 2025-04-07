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
    [sepolia.id]: "0xc56d0e9F2Ca03fc18e674369eB481aC12147b082", // Sepolia测试网地址，实际部署时更换
  },
};

export const CFC_TOKEN_CONTRACT: ContractConfig = {
    name: "CrazyForCode Token",
    address: {
      [mainnet.id]: "0x1234567890123456789012345678901234567890", // 主网测试地址，实际部署时更换
      [sepolia.id]: "0xf9F75d2f80826fC18065F8B4d42667C5fA1BB556", // Sepolia测试网地址，实际部署时更换
    },
  };

export const CFC_NFT_CONTRACT: ContractConfig = {
  name: "CrazyForCode NFT",
  address: {
    [mainnet.id]: "0x1234567890123456789012345678901234567890", // 主网测试地址，实际部署时更换
    [sepolia.id]: "0x4C4dAfb8239A49ED4dE0eFc14eFda476AdA52ce9", // Sepolia测试网地址，实际部署时更换
  },
};

export function getContractAddress(
  contract: ContractConfig,
  chainId: number
): Address | undefined {
  return contract.address[chainId];
} 