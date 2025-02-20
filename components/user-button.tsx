"use client";

import { useCallback } from "react";
import Link from "next/link";
import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

const AvatarIcon = () => (
  <svg
    width="72"
    height="72"
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="rounded-full ring-4 ring-white dark:ring-zinc-900"
  >
    <circle cx="36" cy="36" r="36" fill="url(#gradient)" />
    <defs>
      <radialGradient
        id="gradient"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(36 28) rotate(90) scale(44)"
      >
        <stop stopColor="#D4E157" />
        <stop offset="1" stopColor="#8BC34A" />
      </radialGradient>
    </defs>
  </svg>
);

type ProfileCardProps = {
  name: string;
  role: string;
};

const ProfileCard = ({ name, role }: ProfileCardProps) => (
  <div className="w-full max-w-sm mx-auto">
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div className="relative px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative shrink-0">
            <AvatarIcon />
            <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              {name || "Anonymous"}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 truncate">
              {role || "User"}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ConnectedMenu = () => {
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  const { address } = useAppKitAccount();

  const handleWalletClick = useCallback(() => {
    open({ view: "Account" });
  }, [open]);

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <DropdownMenuContent
      align="end"
      sideOffset={8}
      className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
    >
      <DropdownMenuLabel>
        <ProfileCard name={address?.slice(0, 8) || ""} role="Wallet User" />
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link
            href="/user/profile"
            className="cursor-pointer p-2 hover:bg-accent"
          >
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleWalletClick}
          className="cursor-pointer p-2 hover:bg-accent"
        >
          My Wallet
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={handleDisconnect}
        className="cursor-pointer p-2 hover:bg-accent text-red-600 dark:text-red-400"
      >
        Disconnect
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export function UserButton() {
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();

  const handleConnect = useCallback(() => {
    open({ view: "Connect" });
  }, [open]);

  return (
    <div className="flex items-center">
      {isConnected ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            className="focus:outline-none"
            aria-label="User menu"
          >
            {/* <Button
              variant="ghost"
              className="inline-flex items-center gap-1 px-3 py-1 h-auto rounded-full bg-zinc-900/90 text-zinc-200 hover:bg-zinc-800/90 active:bg-zinc-950/90 backdrop-blur-sm border border-zinc-800/50 transition-all duration-200"
            >
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 rounded-full bg-[#98B83C] opacity-50 blur-[1px]" />
                <div className="absolute inset-0.5 rounded-full bg-[#98B83C]" />
              </div>
              <span className="text-sm font-medium">0x89...be05A1</span>
            </Button> */}
            {/* @ts-expect-error msg */}
            <appkit-account-button balance="hide" />
          </DropdownMenuTrigger>
          <ConnectedMenu />
        </DropdownMenu>
      ) : (
        <Button
          variant="outline"
          onClick={handleConnect}
          className="min-w-[120px] transition-colors"
          aria-label="Connect wallet"
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
