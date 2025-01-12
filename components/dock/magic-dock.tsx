"use client";

import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/ui/dock";
import { buttonVariants } from "@/components/ui/button";
import {
  IconBrandGithub,
  IconHome,
  IconFile,
  IconArrowUp,
} from "@tabler/icons-react";

export type IconProps = React.HTMLAttributes<SVGElement>;

const icons = [
  {
    href: "/",
    icon: IconHome,
    alt: "Home",
  },
  {
    href: "/docs/introduction",
    icon: IconFile,
    alt: "Docs",
  },
  {
    href: "https://github.com/CFCoLearning",
    icon: IconBrandGithub,
    alt: "GitHub",
  },
  {
    href: "#",
    icon: IconArrowUp,
    alt: "Scroll to Top",
  },
];

export function MagicDock() {
  const renderDockIcon = (
    href: string,
    Icon: React.FC<IconProps>,
    alt: string
  ) => (
    <DockIcon key={href}>
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-12 rounded-full"
        )}
        aria-label={alt}
      >
        <Icon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      </Link>
    </DockIcon>
  );

  return (
    <div className="flex items-center justify-center fixed bottom-5 left-1/2 -translate-x-1/2 p-4 z-20">
      <Dock direction="middle">
        {icons.map(({ href, icon, alt }) => renderDockIcon(href, icon, alt))}
      </Dock>
    </div>
  );
}
