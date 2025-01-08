import { notFound } from "next/navigation";

import "@/styles/typography.css";
import { getDocument } from "@/lib/markdown";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Pages({ params }: PageProps) {
  const slug = (await params).slug;
  const res = await getDocument("docs", slug);

  if (!res) notFound();

  const { frontmatter, content } = res;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-blue-500/10 backdrop-blur-md border shadow-lg rounded-lg max-w-4xl w-full p-10">
        <div className="typography">
          <h1 className="text-3xl -mt-2">{frontmatter.title}</h1>
          <p className="-mt-4 text-base text-muted-foreground text-[16.5px]">
            {frontmatter.description}
          </p>
          <div className="typography">{content}</div>
        </div>
      </div>
    </div>
  );
}
