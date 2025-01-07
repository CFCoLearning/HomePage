import { promises as fs } from "fs";
import path from "path";
import { DocumentBasePath } from "@/settings/documents";
import { compileMDX } from "next-mdx-remote/rsc";
import { components } from "@/lib/mdx/components";

type ProjectMdxFrontmatter = {
  title: string;
  description: string;
  keywords: string;
  slug: string;

  githubUrl: string;
};

export async function parseProjectMdx(rawMdx: string) {
  return await compileMDX<ProjectMdxFrontmatter>({
    source: rawMdx,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [],
        remarkPlugins: [],
      },
    },
    components,
  });
}

export async function getAllProjectDocuments() {
  try {
    const contentDir = path.join(process.cwd(), DocumentBasePath, "projects");
    const files = await fs.readdir(contentDir);
    const documents = await Promise.all(
      files.map(async (file) => {
        const contentPath = path.join(contentDir, file, "index.mdx");
        const rawMdx = await fs.readFile(contentPath, "utf-8");
        const parsedMdx = await parseProjectMdx(rawMdx);

        return {
          frontmatter: parsedMdx.frontmatter,
        };
      })
    );

    return documents;
  } catch (err) {
    console.error(err);
    return null;
  }
}
