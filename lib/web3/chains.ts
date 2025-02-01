import { defineChain } from "thirdweb";

const ethereum = defineChain(1);

const polygon = defineChain(137);

const optimism = defineChain(10);

const base = defineChain(8453);

const arbitrum = defineChain(42161);

export const chains = [ethereum, base, arbitrum, polygon, optimism];
