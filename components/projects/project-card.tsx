"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  LuBookOpen,
  LuExternalLink,
  LuCalendar,
  LuGraduationCap,
  LuGithub,
} from "react-icons/lu";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import ShinyButton from "@/components/ui/shiny-button";
import AvatarCircles from "@/components/ui/avatar-circles";

import { getRepoNameFromUrl } from "@/lib/utils";
import { ProjectInfo, ProjectStatus } from "@/lib/project";
import { Contributor, getContributors, getRepository } from "@/lib/github";

function parseStatus(description: string): ProjectStatus {
  if (description.startsWith("📢")) return ProjectStatus.SIGN_UP;
  if (description.startsWith("🚀")) return ProjectStatus.IN_PROGRESS;
  if (description.startsWith("✅")) return ProjectStatus.FINISHED;
  return ProjectStatus.UNKNOWN;
}

export default function ProjectCard({
  projectInfo,
}: {
  projectInfo: ProjectInfo;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState<{
    contributors: Contributor[];
    description: string;
    status: ProjectStatus;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (projectInfo.githubUrl) {
        const repoInfo = getRepoNameFromUrl(projectInfo.githubUrl);

        if (repoInfo) {
          const [owner, name] = repoInfo;

          try {
            const repository = await getRepository(owner, name);
            const contributors = await getContributors(owner, name);

            if (repository) {
              const repoDescription = repository.description || "";
              setFetchedData({
                contributors: contributors || [],
                description:
                  projectInfo.description ||
                  repoDescription ||
                  "CoLearning Project",
                status: parseStatus(repoDescription),
              });
            }
          } catch (error) {
            console.error("Error fetching project data:", error);
          }
        } else {
          console.warn("Invalid GitHub URL:", projectInfo.githubUrl);
        }
      }
    };
    fetchData();
  }, [projectInfo.githubUrl, projectInfo.description]);

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.SIGN_UP:
        return "bg-RoyalBlue-950/50 text-RoyalBlue-400 border-RoyalBlue-400/30";
      case ProjectStatus.IN_PROGRESS:
        return "bg-MutedSage-950/50 text-MutedSage-400 border-MutedSage-400/30";
      case ProjectStatus.FINISHED:
        return "bg-DeepCharcoal-950/50 text-DeepCharcoal-400 border-DeepCharcoal-400/30";
      default:
        return "bg-OliveGray-950/50 text-OliveGray-400 border-OliveGray-400/30";
    }
  };

  const handleCardClick = () => {
    setIsLoading(true);
    window.location.href = projectInfo.pageUrl;
  };

  const buttonLink = projectInfo.githubUrl || projectInfo.pageUrl;
  const ButtonIcon = projectInfo.githubUrl ? LuGithub : LuExternalLink;

  return (
    <motion.div
      className="overflow-hidden w-full max-w-md"
      whileHover={{ y: -5, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.1 }}
    >
      <Card
        className="rounded-lg bg-background/70 backdrop-blur-[6px] overflow-hidden w-full max-w-md shadow-lg cursor-pointer transition-all duration-300"
        onClick={handleCardClick}
      >
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LuGraduationCap className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">{projectInfo.title}</h2>
            </div>
            <Badge
              variant="outline"
              className={`${getStatusColor(
                fetchedData?.status || ProjectStatus.UNKNOWN
              )} rounded-full`}
            >
              {fetchedData?.status || ProjectStatus.UNKNOWN}
            </Badge>
          </div>
          {fetchedData?.description ? (
            <p className="text-muted-foreground">{fetchedData.description}</p>
          ) : (
            <Skeleton className="w-full h-6 rounded-md bg-muted-foreground/20" />
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <LuCalendar className="w-4 h-4 text-primary" />
              <span>开始: {projectInfo.startDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <LuCalendar className="w-4 h-4 text-primary" />
              <span>结束: {projectInfo.endDate}</span>
            </div>
          </div>
          <div className="flex items-center justify-start bg-PaleTeal-950/80 p-3 rounded-md">
            <div className="flex -space-x-2">
              {fetchedData?.contributors ? (
                <AvatarCircles
                  avatarUrls={fetchedData.contributors
                    .slice(0, 5)
                    .map((contributor) => ({
                      imageUrl: contributor.avatar_url,
                      profileUrl: contributor.html_url,
                    }))}
                  numPeople={Math.max(0, fetchedData.contributors.length - 5)}
                />
              ) : (
                <div className="flex -space-x-4">
                  {Array(6)
                    .fill(null)
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800 bg-muted-foreground/20"
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
          {projectInfo.tags && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LuBookOpen className="w-4 h-4 text-primary" />
                <span className="font-medium">学习主题</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {projectInfo.tags.map((tag, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-SlateBlue-900 hover:bg-SlateBlue-400/80"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <ShinyButton
            className="w-full bg-background hover:bg-background/80 text-muted-foreground transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              setIsLoading(true);
              window.open(buttonLink, "_blank");
            }}
            disabled={isLoading}
          >
            <div className="flex justify-center gap-2">
              <ButtonIcon className="w-4 h-4" />
              {isLoading
                ? "Loading..."
                : projectInfo.githubUrl
                ? "View on GitHub"
                : "View Project"}
            </div>
          </ShinyButton>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
