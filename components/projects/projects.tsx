"use client";

import React, { useEffect, useState } from "react";
import { BentoGrid } from "./project-grid";
import { ProjectCard } from "./project-card";

import { GitHubService, Repository, Contributor } from "@/lib/github";
import { ProjectStatus } from "@/lib/project";
import { PageRoutes } from "@/lib/pageroutes";

export function Projects({ orgName }: { orgName: string }) {
  const [repos, setRepos] = useState<Repository[]>([]); // 仓库列表
  const [contributors, setContributors] = useState<
    Record<number, Contributor[]>
  >({}); // 协作者数据
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState<string | null>(null); // 错误状态

  const getStatusFromDescription = (
    description: string | null
  ): ProjectStatus => {
    if (!description) return ProjectStatus.UNKNOWN;

    if (description.includes("📢")) {
      return ProjectStatus.SIGN_UP; // 报名中
    }
    if (description.includes("🚀")) {
      return ProjectStatus.IN_PROGRESS; // 进行中
    }
    if (description.includes("✅")) {
      return ProjectStatus.FINISHED; // 已结束
    }

    return ProjectStatus.UNKNOWN; // 未知状态
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const data = await GitHubService.getOrgRepositorys(orgName);
        setRepos(data);

        const contributorsPromises = data.map(async (repo) => {
          const contributors = await GitHubService.getContributors(
            orgName,
            repo.name
          );
          return { repoId: repo.id, contributors };
        });

        const contributorsData = await Promise.all(contributorsPromises);

        const contributorsMap: Record<number, Contributor[]> = {};
        contributorsData.forEach(({ repoId, contributors }) => {
          contributorsMap[repoId] = contributors;
        });

        setContributors(contributorsMap);
      } catch (err) {
        setError("Failed to fetch repositories or contributors.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="py-8">
      <BentoGrid className="max-w-4xl mx-auto">
        {repos.map((repo) => (
          <ProjectCard
            key={repo.id}
            title={repo.name}
            description={repo.description}
            contributors={contributors[repo.id] || []}
            status={getStatusFromDescription(repo.description)}
            link={{
              repoLink: repo.html_url,
              pageLink: getPageLink(repo.name),
            }}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

function getPageLink(title: string): string | undefined {
  const match = PageRoutes.find((route) => route.title === title);
  return match?.href;
}
