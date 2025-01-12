import { ScrollArea } from "@/components/ui/scroll-area";
import { PageMenu } from "@/components/docs/pagemenu";

export function Sidebar() {
  return (
    <aside className="md:flex hidden flex-[1] min-w-[230px] sticky top-16 flex-col h-[94.5vh] overflow-y-auto">
      <ScrollArea className="py-4">
        <PageMenu />
      </ScrollArea>
    </aside>
  );
}
