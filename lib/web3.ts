"use client";

import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClient } from "@tanstack/react-query";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const config = getDefaultConfig({
  appName: "CFC WEB",
  projectId: "CFC_WEB",
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});

export const queryClient = new QueryClient();
