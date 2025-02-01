import { ThirdwebProvider } from "thirdweb/react";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
}
