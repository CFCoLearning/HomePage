import { HomePageBackground } from "@/components/home-page/background";
import { HeroSection } from "@/components/home-page/hero-section";
import { Projects } from "@/components/projects/projects";

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
