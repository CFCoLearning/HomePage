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
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type ProfileCardProps = {
  name: string;
  role: string;
};

const ProfileCard = ({ name, role }: ProfileCardProps) => (
  <div className="w-full max-w-xs mx-auto">
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div className="relative px-4 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 truncate">
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

  const user = useQuery(api.user.getUser, address ? { address } : "skip");

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
        <ProfileCard name={user?.userName || "Known"} role="Wallet User" />
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
