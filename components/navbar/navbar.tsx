"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Home, LucideListFilterPlus, Activity } from "lucide-react";
import { useAppKitAccount } from "@reown/appkit/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function Navbar() {
  const { address, isConnected } = useAppKitAccount();
  const autoCreateUser = useMutation(api.user.autoCreateUser);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        const maxScroll = 200;
        const progress = Math.min(scrollPosition / maxScroll, 1);
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 用户自动注册逻辑
  useEffect(() => {
    const handleUserRegistration = async () => {
      if (isConnected && address) {
        try {
          await autoCreateUser({
            address: address,
          });
        } catch (error) {
          console.error("Failed to register user:", error);
        }
      }
    };

    handleUserRegistration();
  }, [isConnected, address]);

  const navItems = [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    // { name: "Projects", href: "/404", icon: <Grid size={20} /> },
    {
      name: "Docs",
      href: "/docs/introduction",
      icon: <LucideListFilterPlus size={20} />,
    },
    {
      name: "Hackathon",
      href: "/hackathon",
      icon: <Activity size={20} />,
    },
    // { name: "Contact", href: "/contact", icon: <Send size={24} /> },
  ];

  const navWidth = `${Math.max(50, 90 - scrollProgress * 40)}%`;

  return (
    <>
      {/* 桌面端 */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center py-4">
        <nav
          style={{ width: navWidth }}
          className={`flex items-center px-6 py-1 transition-all duration-500 ease-in-out
            ${
              scrollProgress > 0
                ? "bg-background/80 backdrop-blur-lg rounded-full shadow-lg"
                : "bg-background/80 backdrop-blur-sm rounded-full"
            }
          `}
        >
          <div className="flex-1">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              CFCO
            </Link>
          </div>

          <div className="flex-1 flex justify-center">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1 text-sm transition-colors duration-300 
                    ${
                      pathname === item.href
                        ? "text-foreground font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                  >
                    {pathname === item.href && (
                      <span className="absolute -left-3 w-1.5 h-1.5 rounded-full bg-green-500" />
                    )}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 flex justify-end">
            {/* <button
              // onClick={toggleTheme}
              className="p-2 rounded-md transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </button> */}
            {/* <WalletButton /> */}
            {/* @ts-expect-error msg */}
            <appkit-button balance="hide" />
          </div>
        </nav>
      </header>

      {/* 移动端 */}
      <nav
        className="fixed bottom-0 left-0 right-0 backdrop-blur-md shadow-lg
                   md:hidden flex justify-around items-center py-4 z-50"
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center text-white transition-colors
              ${pathname === item.href ? "text-MutedSage-500" : "text-gray-400"}
            `}
          >
            <div>{item.icon}</div>
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
