import { Sidebar } from "@/components/docs/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-start gap-14 m-10">
      <Sidebar />
      <div className="flex-1 md:flex-[6]">{children}</div>
    </div>
  );
}
