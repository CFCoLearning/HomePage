import { notFound } from "next/navigation";

import { Toc } from "@/components/docs/toc";
import { Typography } from "@/components/typography";
import { PageBreadcrumb } from "@/components/docs/pagebreadcrumb";

import { getDocument } from "@/lib/markdown";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function Pages({ params }: PageProps) {
  const { slug = [] } = await params;
  const pathName = slug.join("/");
  const res = await getDocument("docs", pathName);

  if (!res) notFound();

  const { frontmatter, content, tocs } = res;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
      <div className="flex items-start">
        <div className="flex-[3] pt-10">
          <PageBreadcrumb paths={slug} />
          <Typography>
            <div className="typography">
              <h1 className="text-3xl -mt-2">{frontmatter.title}</h1>
              <p className="-mt-4 text-base text-muted-foreground text-[16.5px]">
                {frontmatter.description}
              </p>
              <div>{content}</div>
            </div>
          </Typography>
        </div>
        <div className="hidden xl:flex xl:flex-col sticky top-16 gap-3 py-8 min-w-[230px] h-[94.5vh] toc">
          <Toc tocs={tocs} />
        </div>
      </div>
    </main>
  );
}
