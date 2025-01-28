"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowUpRightFromSquare } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getGitHubUser } from "@/lib/github";
import { GetStatusColor, ProjectDetail, ProjectStatus } from "@/lib/project";

export function Header({ project }: { project: ProjectDetail }) {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getGitHubUser(project.initiator);
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserInfo(null);
      }
    };

    fetchUser();
  }, [project.initiator]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      {/* <div className="container mx-auto p-4 z-10"> */}
      <div className="bg-background p-8">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
          {project.github_url && (
            <Link
              href={project.github_url}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-medium text-primary bg-RoyalBlue-700 rounded-full shadow-lg hover:bg-RoyalBlue-600 transition-all duration-300 ease-in-out whitespace-nowrap"
            >
              <span>Check it out</span>
              <ArrowUpRightFromSquare className="h-5 w-5" />
            </Link>
          )}
        </div>
        <div className="flex gap-4">
          <div className="space-y-4">
            <p className="text-xl text-muted-foreground">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Badge className="bg-secondary/10 text-secondary px-4 py-2 text-base rounded-full">
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center whitespace-nowrap">
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold whitespace-nowrap">
                  发起人:
                </span>
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
                          <Button
                            variant="link"
                            className="p-0 h-auto font-normal"
                          >
                            @{project.initiator}
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          variant="link"
                          className="p-0 h-auto font-normal"
                        >
                          @{project.initiator}
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
                            {project.initiator.slice(0, 2).toUpperCase()}
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
                            <span title="Followers">
                              👥 {userInfo.followers}
                            </span>
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
            <div className="flex items-center">
              <span className="text-xl font-semibold mr-4">状态:</span>
              <div className="flex flex-grow justify-center">
                <span
                  className={`${GetStatusColor(
                    project.status || ProjectStatus.UNKNOWN
                  )} px-4 py-1 rounded-full text-sm text-primary`}
                >
                  {project.status || ProjectStatus.UNKNOWN}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </motion.div>
  );
}
