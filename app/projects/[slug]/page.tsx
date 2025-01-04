import { notFound } from "next/navigation";

import "@/styles/typography.css";
import { getDocument } from "@/lib/markdown";
import Header from "../(components)/header";
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
    <div className="flex items-start gap-14">
      <div className="flex-[3] pt-10">
        <div className="typography">
          <Header
            title={frontmatter.title}
            description={frontmatter.description}
          />
          <Content content={content} />
        </div>
      </div>
    </div>
  );
}
