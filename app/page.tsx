import { Hero } from "@/components/hero/hero";
import { Projects } from "@/components/projects/projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects orgName="CFCoLearning" />
    </main>
  );
}
