import { Hero } from "@/components/hero/hero";
import { Projects } from "@/components/projects/projects";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects orgName="CFCoLearning" />
    </main>
  );
}
