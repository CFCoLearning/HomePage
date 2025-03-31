"use client";

import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { SolanaAdapter } from "@reown/appkit-adapter-solana";
import {
  mainnet,
  arbitrum,
  base,
  polygon,
  solana,
  sepolia,
} from "@reown/appkit/networks";
import {
  SolflareWalletAdapter,
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { DefaultSIWX } from "@reown/appkit-siwx";

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [mainnet, arbitrum, polygon, base, solana, sepolia];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
  transports: {
    [mainnet.id]: http(
      "https://eth-mainnet.g.alchemy.com/v2/uGsEZP9zr3DFh1rGiFj4safeFvFfC7B0"
    ),
    [polygon.id]: http(
      "https://polygon-mainnet.g.alchemy.com/v2/uGsEZP9zr3DFh1rGiFj4safeFvFfC7B0"
    ),
    [arbitrum.id]: http(
      "https://arb-mainnet.g.alchemy.com/v2/uGsEZP9zr3DFh1rGiFj4safeFvFfC7B0"
    ),
    [base.id]: http(
      "https://base-mainnet.g.alchemy.com/v2/uGsEZP9zr3DFh1rGiFj4safeFvFfC7B0"
    ),
    [sepolia.id]: http(
      "https://endpoints.omniatech.io/v1/eth/sepolia/public"
    ),
  },
});

const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
});

export const config = wagmiAdapter.wagmiConfig;

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "cfc-web",
  description: "AppKit Example",
  url: "https://bibibai.top", // origin must match your domain & subdomain
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter, solanaWeb3JsAdapter],
  projectId,
  networks: [mainnet, arbitrum, base, polygon, solana, sepolia],
  defaultNetwork: mainnet,
  metadata: metadata,
  enableWalletConnect: false,
  features: {
    analytics: true,
    socials: false,
    email: false,
  },
  siwx: new DefaultSIWX(),
});

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
