"use server";

import { cookies } from "next/headers";
import { privateKeyToAccount } from "thirdweb/wallets";
import { VerifyLoginPayloadParams, createAuth } from "thirdweb/auth";

import { client } from "@/lib/web3/client";

const privateKey = process.env.THIRDWEB_ADMIN_PRIVATE_KEY || "";

if (!privateKey) {
  throw new Error("Missing THIRDWEB_ADMIN_PRIVATE_KEY in .env file.");
}

const thirdwebAuth = createAuth({
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
  adminAccount: privateKeyToAccount({ client, privateKey }),
  client,
});

export async function generatePayload({
  address,
  chainId,
}: {
  address: string;
  chainId: number;
}) {
  return thirdwebAuth.generatePayload({ address, chainId });
}

export async function login(payload: VerifyLoginPayloadParams) {
  const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
  console.log(verifiedPayload);
  if (verifiedPayload.valid) {
    const jwt = await thirdwebAuth.generateJWT({
      payload: verifiedPayload.payload,
    });
    const cookieStore = await cookies();
    cookieStore.set("jwt", jwt);
  }
}

export async function isLoggedIn() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt");
  console.log(jwt);
  if (!jwt?.value) {
    return false;
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
  if (!authResult.valid) {
    return false;
  }
  return true;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("jwt");
}
