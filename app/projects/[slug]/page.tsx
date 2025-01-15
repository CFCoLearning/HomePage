import { notFound } from "next/navigation";

import "@/styles/typography.css";
import { getDocument } from "@/lib/markdown";
import { Header } from "../(components)/header";
import Content from "../(components)/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Pages({ params }: PageProps) {
  const slug = (await params).slug;
  const res = await getDocument("projects", slug);

  if (!res) notFound();

  const { frontmatter, content } = res;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-blue-500/10 backdrop-blur-md border shadow-lg rounded-lg max-w-4xl w-full p-10">
        <Header
          title={frontmatter.title}
          status="In Progress"
          tags={frontmatter.keywords}
          initiator="echozyr2001"
        />
        <div className="typography">
          <Content content={content} />
        </div>
      </div>
    </div>
  );
}
