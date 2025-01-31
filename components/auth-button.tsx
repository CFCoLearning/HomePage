// import { client } from "@/lib/web3";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";

import { createWallet } from "thirdweb/wallets";

const wallets = [
  createWallet("io.metamask"),
  createWallet("io.rabby"),
  createWallet("app.phantom"),
];

const client = createThirdwebClient({
  secretKey:
    "VZmA6BRwjTpVrHKSxdsDYrnCi-duKM_oYwrdkFWyKYYQuJTn29jNZn03_YpEGdGd1uYhIOBbykPAD_BNm5BiLw",
  clientId: "27e99da0cb413cf2999c849b9af8ecf5",
});

export function Example() {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      connectModal={{
        size: "compact",
        showThirdwebBranding: false,
      }}
    />
  );
}
