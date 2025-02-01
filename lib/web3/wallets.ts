import { createWallet } from "thirdweb/wallets";

export const wallets = [
  createWallet("io.metamask"),
  createWallet("io.rabby"),
  createWallet("app.phantom"),
];
