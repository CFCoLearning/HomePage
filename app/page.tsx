import { Projects } from "@/components/projects/projects";
import { HeroSection } from "@/components/home-page/hero-section";
import { HomePageBackground } from "@/components/home-page/background";

import "@/styles/home-page.css";

export default function Home() {
  return (
    <main>
      <HomePageBackground />
      <HeroSection />
      <Projects />
    </main>
  );
}
