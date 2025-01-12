import { Documents } from "@/settings/documents";

export type Paths =
  | {
      title: string;
      href: string;
      noLink?: true;
      heading?: string;
      items?: Paths[];
    }
  | {
      spacer: true;
    };

export const Routes: Paths[] = [...Documents];

type Page = { title: string; href: string };

function isRoute(node: Paths): node is { title: string; href: string } {
  return "title" in node && "href" in node;
}

function getAllLinks(node: Paths): Page[] {
  if (isRoute(node) && !node.noLink) {
    const pages: Page[] = [{ title: node.title, href: node.href }];

    if (node.items) {
      const childPages = node.items.flatMap((subNode) => {
        if (isRoute(subNode)) {
          return getAllLinks({
            ...subNode,
            href: `${node.href}${subNode.href}`,
          });
        }
        return [];
      });
      return [...pages, ...childPages];
    }

    return pages;
  }

  return [];
}

export const PageRoutes = Routes.flatMap(getAllLinks);
