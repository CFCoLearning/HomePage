import { ThirdwebProvider } from "thirdweb/react";
import { ConvexClientProvider } from "./convex-client-provider";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThirdwebProvider>
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </ThirdwebProvider>
  );
}
