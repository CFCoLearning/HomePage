import { Routes } from "@/lib/pageroutes";
import SubLink from "@/components/docs/sublink";

export function PageMenu({ isSheet = false }) {
  return (
    <div className="flex flex-col gap-3.5 mt-5 pb-6">
      {Routes.map((item, index) => {
        if ("spacer" in item) {
          return (
            <div key={`spacer-${index}`} className="my-2 mr-3">
              <hr className="border-t border-gray-300" />
            </div>
          );
        }

        const { title, heading, href } = item;
        return (
          <div key={title + index} className="mb-2">
            {item.heading && (
              <h2 className="text-sm font-bold mb-2">{heading}</h2>
            )}
            <SubLink
              href={`/docs${href}`}
              title={title}
              level={0}
              isSheet={isSheet}
              items={item.items}
            />
          </div>
        );
      })}
    </div>
  );
}
