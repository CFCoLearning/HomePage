import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function Typography({ children, className }: TypographyProps) {
  return (
    <div
      className={cn(
        // Base typography styles
        "prose prose-zinc w-full max-w-none",
        // Dark mode
        "dark:prose-invert",
        // Heading styles
        "prose-headings:scroll-m-20",
        // Code block styles
        "prose-pre:border prose-pre:bg-zinc-50 dark:prose-pre:bg-zinc-900",
        "prose-code:rounded-md prose-code:bg-zinc-100 prose-code:p-1 prose-code:text-sm",
        "dark:prose-code:bg-zinc-800",
        // Table styles
        "[&_.table-container]:w-full [&_.table-container]:overflow-x-auto [&_.table-container]:rounded-lg",
        "[&_.table-container]:border [&_.table-container]:border-zinc-200 dark:[&_.table-container]:border-zinc-700",
        // Custom className
        className
      )}
    >
      {children}
    </div>
  );
}

export function TableContainer({ children }: { children: React.ReactNode }) {
  return <div className="table-container">{children}</div>;
}
