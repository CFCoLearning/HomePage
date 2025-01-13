"use client";

import { motion } from "motion/react";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import CTA from "./cta";

export function Hero() {
  return (
    <motion.div
      className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        scale: { type: "spring", visualDuration: 0.9, bounce: 0.1 },
      }}
    >
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <CTA />
    </motion.div>
  );
}
