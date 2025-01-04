import { createReadStream, promises as fs } from "fs";
import path from "path";

import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { components } from "@/lib/components";

type BaseMdxFrontmatter = {
  title: string;
  description: string;
  keywords: string;
};

async function parseMdx<Frontmatter>(rawMdx: string) {
  return await compileMDX<Frontmatter>({
    source: rawMdx,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          // preCopy,
          // rehypeCodeTitles,
          // rehypeKatex,
          // rehypePrism,
          // rehypeSlug,
          // rehypeAutolinkHeadings,
          // postCopy,
        ],
        remarkPlugins: [remarkGfm],
      },
    },
    components,
  });
}

export async function getAllDocuments(category: string) {
  try {
    const contentDir = path.join(process.cwd(), "/contents/", category);
    const files = await fs.readdir(contentDir);
    const documents = await Promise.all(
      files.map(async (file) => {
        const contentPath = path.join(contentDir, file);
        const rawMdx = await fs.readFile(contentPath, "utf-8");
        const parsedMdx = await parseMdx<BaseMdxFrontmatter>(rawMdx);

        return {
          slug: file,
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

export async function getDocument(category: string, instance: string) {
  try {
    const contentPath = getDocumentPath(category, instance);
    let rawMdx = "";
    let lastUpdated: string | null = null;

    rawMdx = await fs.readFile(contentPath, "utf-8");
    const stats = await fs.stat(contentPath);
    lastUpdated = stats.mtime.toISOString();

    const parsedMdx = await parseMdx<BaseMdxFrontmatter>(rawMdx);

    return {
      frontmatter: parsedMdx.frontmatter,
      content: parsedMdx.content,
      lastUpdated,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

const getDocumentPath = (() => {
  const cache = new Map<string, string>();
  return (category: string, instance: string) => {
    const slug = category + "/" + instance;
    if (!cache.has(slug)) {
      cache.set(slug, computeDocumentPath(slug));
    }
    return cache.get(slug)!;
  };
})();

const computeDocumentPath = (slug: string) => {
  return path.join(process.cwd(), "/contents/", `${slug}/index.mdx`);
};
