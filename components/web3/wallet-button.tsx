"use client";

import { ConnectButton } from "thirdweb/react";

import { chains } from "@/lib/web3/chains";
import { client } from "@/lib/web3/client";
import { generatePayload, isLoggedIn, login, logout } from "@/lib/web3/auth";
import { wallets } from "@/lib/web3/wallets";

export function WalletButton() {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      connectModal={{
        size: "compact",
        showThirdwebBranding: false,
      }}
      chains={chains}
      auth={{
        isLoggedIn: async (address) => {
          console.log("checking if logged in!", { address });
          return await isLoggedIn();
        },
        doLogin: async (params) => {
          console.log("logging in!");
          await login(params);
        },
        getLoginPayload: async ({ address }) =>
          await generatePayload({ address, chainId: 8453 }),
        doLogout: async () => {
          console.log("logging out!");
          await logout();
        },
      }}
    />
  );
}
