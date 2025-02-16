import { ConvexClientProvider } from "./convex-client-provider";
import Web3WalletProvider from "./web3-wallet-provider";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
      <Web3WalletProvider>{children}</Web3WalletProvider>
    </ConvexClientProvider>
  );
}
