"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getGitHubUser } from "@/lib/github";

interface HeaderProps {
  title: string;
  tags?: string[];
  status?: string;
  initiator: string;
}

export function Header({ title, tags, status, initiator }: HeaderProps) {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getGitHubUser(initiator);
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserInfo(null);
      }
    };

    fetchUser();
  }, [initiator]);

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
              {userInfo ? (
                <Link
                  href={userInfo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <Button variant="link" className="p-0 h-auto font-normal">
                    @{initiator}
                  </Button>
                </Link>
              ) : (
                <Button variant="link" className="p-0 h-auto font-normal">
                  @{initiator}
                </Button>
              )}
            </div>
          </HoverCardTrigger>
          <HoverCardContent align="start" className="w-80">
            {userInfo ? (
              <div className="flex gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={userInfo.avatar_url}
                    alt={`${userInfo.name || userInfo.login}'s avatar`}
                  />
                  <AvatarFallback>
                    {initiator.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-semibold">
                    {userInfo.name || userInfo.login}
                  </h4>
                  {userInfo.bio && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {userInfo.bio}
                    </p>
                  )}
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span title="Public repositories">
                      📦 {userInfo.public_repos}
                    </span>
                    <span title="Followers">👥 {userInfo.followers}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            )}
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
