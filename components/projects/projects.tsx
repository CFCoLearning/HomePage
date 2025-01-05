"use server";

import { BentoGrid } from "./project-grid";
import { ProjectCard } from "./project-card";

import { OrgRepository } from "@/settings/base";
import {
  GitHubService,
  Contributor,
  Repository,
  getRepoNameFromUrl,
} from "@/lib/github";
import { ProjectStatus } from "@/lib/project";
import { getAllProjectDocuments } from "@/lib/mdx/projects";

export async function Projects() {
  try {
    const documents = await getAllProjectDocuments();

    if (!documents || documents.length === 0) {
      return (
        <div className="text-center text-gray-500">
          <p>No projects found.</p>
        </div>
      );
    }

    const contributorsMap: Record<string, Contributor[]> = {};
    const repoMap: Record<string, Repository> = {};

    // 获取仓库信息和贡献者信息
    const fetchRepoInfoPromises = documents.map(async (doc) => {
      const githubUrl = doc.frontmatter.githubUrl;

      if (githubUrl) {
        const repoName = getRepoNameFromUrl(githubUrl);
        if (repoName) {
          try {
            // 获取仓库信息
            const repo = await GitHubService.getRepository(
              OrgRepository,
              repoName
            );
            if (repo) {
              repoMap[githubUrl] = repo;

              // 获取贡献者信息
              const contributors = await GitHubService.getContributors(
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

    const getStatusFromDescription = (
      description: string | null
    ): ProjectStatus => {
      if (!description) return ProjectStatus.UNKNOWN;
      if (description.includes("📢")) return ProjectStatus.SIGN_UP;
      if (description.includes("🚀")) return ProjectStatus.IN_PROGRESS;
      if (description.includes("✅")) return ProjectStatus.FINISHED;
      return ProjectStatus.UNKNOWN;
    };

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
  } catch (error) {
    console.error("Failed to fetch projects or contributors:", error);
    return (
      <div className="text-center text-red-500">
        <p>Failed to load projects. Please try again later.</p>
      </div>
    );
  }
}
