import { Sidebar } from "@/components/docs/sidebar";
import { DashboardGradient } from "./(components)/dashboard-gradient";
import "@/styles/dashboard.css";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] relative overflow-hidden p-10">
      <DashboardGradient />
      <div className="hidden border-r md:block relative">
        <div className="flex h-full flex-col gap-2">
          <div className="flex items-center pt-8 pl-6 pb-10"></div>
          <div className="flex flex-col flex-grow">
            <Sidebar />
          </div>
        </div>
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}
