import { WavyBackground } from "@/components/ui/wavy-background";

export default function HackathonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WavyBackground className="min-h-screen relative">
      {children}
    </WavyBackground>
  );
}
