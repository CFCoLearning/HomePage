import { ConvexClientProvider } from "./convex-client-provider";
import ContextProvider from "./web3-provider";
import { headers } from "next/headers";

export async function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get("cookie");

  return (
    <ConvexClientProvider>
      <ContextProvider cookies={cookies}>{children}</ContextProvider>
    </ConvexClientProvider>
  );
}
