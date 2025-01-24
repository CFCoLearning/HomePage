import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "../ui/animated-grid-pattern";

export function HomePageBackground() {
  return (
    <>
      <div className={"grain-background background-base"} />
      <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.2}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[100%] skew-y-12"
        )}
      />
      <div className={"large-blur background-base"} />
      <div className={"small-blur background-base"} />
    </>
  );
}
