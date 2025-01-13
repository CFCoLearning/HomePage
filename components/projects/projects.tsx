"use client";

import { useEffect, useState } from "react";

import { BentoGrid } from "./project-grid";
import { ProjectCard } from "./project-card";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Contributor,
  Repository,
  getContributors,
  getRepository,
} from "@/lib/github";
import { ProjectStatus } from "@/lib/project";
import { getAllProjectDocuments } from "@/lib/mdx/projects";
import { getRepoNameFromUrl } from "@/lib/utils";
import { OrgRepository } from "@/settings/base";

export function Projects() {
  const [projectsData, setProjectsData] = useState<{
    documents: any[];
    contributorsMap: Record<string, Contributor[]>;
    repoMap: Record<string, Repository>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documents = await getAllProjectDocuments();
        if (!documents || documents.length === 0) {
          setProjectsData({ documents: [], contributorsMap: {}, repoMap: {} });
          setLoading(false);
          return;
        }

        const contributorsMap: Record<string, Contributor[]> = {};
        const repoMap: Record<string, Repository> = {};

        const fetchRepoInfoPromises = documents.map(async (doc) => {
          const githubUrl = doc.frontmatter.githubUrl;

          if (githubUrl) {
            const repoName = getRepoNameFromUrl(githubUrl);
            if (repoName) {
              try {
                // 获取仓库信息
                const repo = await getRepository(OrgRepository, repoName);
                if (repo) {
                  repoMap[githubUrl] = repo;

                  // 获取贡献者信息
                  const contributors = await getContributors(
                    OrgRepository,
                    repoName
                  );
                  contributorsMap[githubUrl] = contributors || [];
                }
              } catch (error) {
                console.error(`Failed to fetch data for ${repoName}:`, error);
              }
            } else {
              console.warn(`Invalid GitHub URL: ${githubUrl}`);
            }
          }
        });

        await Promise.all(fetchRepoInfoPromises);
        setProjectsData({ documents, contributorsMap, repoMap });
      } catch (error) {
        console.error("Failed to fetch projects or contributors:", error);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusFromDescription = (
    description: string | null
  ): ProjectStatus => {
    if (!description) return ProjectStatus.UNKNOWN;
    if (description.includes("📢")) return ProjectStatus.SIGN_UP;
    if (description.includes("🚀")) return ProjectStatus.IN_PROGRESS;
    if (description.includes("✅")) return ProjectStatus.FINISHED;
    return ProjectStatus.UNKNOWN;
  };

  if (loading) {
    return (
      <div className="py-8">
        <BentoGrid className="max-w-4xl mx-auto">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </BentoGrid>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!projectsData || projectsData.documents.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p>No projects found.</p>
      </div>
    );
  }

  const { documents, contributorsMap, repoMap } = projectsData;

  return (
    <div className="py-8">
      <BentoGrid className="max-w-4xl mx-auto">
        {documents.map((doc, i) => {
          const githubUrl = doc.frontmatter.githubUrl;
          const repo = githubUrl ? repoMap[githubUrl] : null;

          // 如果仓库存在，优先使用仓库数据
          const title =
            repo?.name || doc.frontmatter.title || "Unknown Project";
          const description =
            repo?.description ||
            doc.frontmatter.description ||
            "No description available";
          const status = repo
            ? getStatusFromDescription(repo?.description || "")
            : getStatusFromDescription(doc.frontmatter.keywords || "");

          return (
            <ProjectCard
              key={i}
              title={title}
              description={description}
              pageLink={doc.frontmatter.slug}
              repoProps={
                githubUrl && repo
                  ? {
                      repoLink: githubUrl,
                      status: status,
                      contributors: contributorsMap[githubUrl] || [],
                    }
                  : undefined
              }
            />
          );
        })}
      </BentoGrid>
    </div>
  );
}
