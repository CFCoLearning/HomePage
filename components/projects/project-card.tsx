"use client";

import { useEffect, useState } from "react";
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
              setFetchedData({
                contributors: contributors || [],
                description:
                  projectInfo.description ||
                  repository.description ||
                  "CoLearning Project",
                status: parseStatus(repository.description),
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
        return "bg-blue-950/50 text-blue-400 border-blue-400/30";
      case ProjectStatus.IN_PROGRESS:
        return "bg-emerald-950/50 text-emerald-400 border-emerald-400/30";
      case ProjectStatus.FINISHED:
        return "bg-gray-800/50 text-gray-400 border-gray-400/30";
      default:
        return "bg-yellow-950/50 text-yellow-400 border-yellow-400/30";
    }
  };

  const handleCardClick = () => {
    setIsLoading(true);
    window.location.href = projectInfo.pageUrl;
  };

  const buttonLink = projectInfo.githubUrl || projectInfo.pageUrl;
  const ButtonIcon = projectInfo.githubUrl ? LuGithub : LuExternalLink;

  return (
    <Card
      className="w-full max-w-md bg-card text-card-foreground shadow-lg cursor-pointer transition-all duration-300 hover:bg-muted/50"
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
            )}`}
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
        <div className="flex items-center justify-start bg-muted p-3 rounded-md">
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
              <Skeleton className="w-8 h-8 rounded-full bg-muted-foreground/20" />
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
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
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
          className="w-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors duration-300"
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
  );
}
