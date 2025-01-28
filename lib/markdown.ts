import { createReadStream, promises as fs } from "fs";
import path from "path";

import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { compileMDX } from "next-mdx-remote/rsc";
import { components } from "@/lib/mdx/components";

type BaseMdxFrontmatter = {
  title: string;
  description: string;
  keywords: [string];
};

const headingsRegex = /^(#{2,4})\s(.+)$/gm;

function innerslug(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}\-]/gu, "");
}

export async function ParseRawMdx<Frontmatter>(rawMdx: string) {
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
          rehypeSlug,
          // rehypeAutolinkHeadings,
          // postCopy,
        ],
        remarkPlugins: [remarkGfm],
      },
    },
    components,
  });
}

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
          rehypeSlug,
          // rehypeAutolinkHeadings,
          // postCopy,
        ],
        remarkPlugins: [remarkGfm],
      },
    },
    components,
  });
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
    const tocs = await getTable(category, instance);

    return {
      frontmatter: parsedMdx.frontmatter,
      content: parsedMdx.content,
      tocs,
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

export async function getTable(
  category: string,
  instance: string
): Promise<Array<{ level: number; text: string; href: string }>> {
  const extractedHeadings: Array<{
    level: number;
    text: string;
    href: string;
  }> = [];
  let rawMdx = "";

  const contentPath = path.join(
    process.cwd(),
    "/contents/",
    `${category}/${instance}/index.mdx`
  );
  try {
    const stream = createReadStream(contentPath, { encoding: "utf-8" });
    for await (const chunk of stream) {
      rawMdx += chunk;
    }
  } catch (error) {
    console.error("Error reading local file:", error);
    return [];
  }

  let match;
  while ((match = headingsRegex.exec(rawMdx)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    extractedHeadings.push({
      level: level,
      text: text,
      href: `#${innerslug(text)}`,
    });
  }

  return extractedHeadings;
}
