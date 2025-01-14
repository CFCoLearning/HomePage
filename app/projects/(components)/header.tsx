import Link from "next/link";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  tags?: string[];
  status?: string;
  initiator: {
    name: string;
    url: string;
  };
}

export function Header({ title, tags, status, initiator }: HeaderProps) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {status && (
          <span className="px-4 py-1 rounded-full text-sm text-white bg-green-600">
            {status}
          </span>
        )}
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="px-4 py-1 rounded-full text-sm border border-gray-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">发起人</span>
        <HoverCard>
          <HoverCardTrigger asChild>
            <div>
              <Link href={`${initiator.url}`}>
                <Button variant="link">@{initiator.name}</Button>
              </Link>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">
                  The React Framework – created and maintained by @vercel.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
