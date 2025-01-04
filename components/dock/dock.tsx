"use client";

import "@/styles/dock.css";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconHome,
  IconFile,
  IconArrowUp,
} from "@tabler/icons-react";

export function Dock() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Documents",
      icon: (
        <IconFile className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/docs",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/CFCoLearning",
    },
    {
      title: "ToTop",
      icon: (
        <IconArrowUp className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  return (
    <div className="dock-container flex items-center justify-center w-full fixed bottom-5 left-0 p-4">
      <FloatingDock
        items={links}
        mobileClassName="flex fixed right-4 bottom-4"
      />
    </div>
  );
}
