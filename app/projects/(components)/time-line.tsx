"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectTimeline } from "@/lib/project";

interface TimelineProps {
  timeline: ProjectTimeline;
}

export default function Timeline({ timeline }: TimelineProps) {
  const timelineData = [
    {
      title: "报名时间",
      time: `${timeline.registration.start} ~ ${timeline.registration.end}`,
    },
    {
      title: "共学时间",
      time: `${timeline.learning.start} ~ ${timeline.learning.end}`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-lg bg-secondary/10">
          <Calendar className="h-6 w-6" />
        </div>
        <h2 className="font-display text-3xl font-bold">时间安排</h2>
      </div>

      <div className="space-y-8">
        {timelineData.map((period, index) => (
          <motion.div
            key={period.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.2 }}
            className="relative pl-8"
          >
            <div className="absolute left-0 top-0 bottom-0 w-px bg-secondary/30" />
            <div className="absolute left-0 top-[2.25rem] -translate-x-1/2 w-4 h-4">
              <div className="w-full h-full rounded-full bg-secondary/30" />
              <div className="absolute inset-1 rounded-full bg-secondary animate-pulse" />
            </div>
            <Card className="bg-surface-dark/50 backdrop-blur-xl border-secondary/10">
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-semibold mb-3 ">
                  {period.title}
                </h3>
                <p className="text-lg">{period.time}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
