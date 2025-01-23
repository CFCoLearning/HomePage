"use client";

import { motion } from "framer-motion";
import { Calendar, Star } from "lucide-react";

export default function Timeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-retro-orange/10 p-2 rounded-xl">
          <Calendar className="h-6 w-6 text-retro-orange" />
        </div>
        <h2 className="font-retro text-2xl text-gray-700">时间安排</h2>
      </div>

      <div className="space-y-6">
        {[
          { title: "报名时间", time: "2024-12-30 ~ 2025-01-05" },
          { title: "共学时间", time: "2025-01-06 ~ 2025-01-26" },
        ].map((period, index) => (
          <motion.div
            key={period.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.2 }}
            className="relative pl-8"
          >
            <div className="absolute left-0 top-0 bottom-0 w-px bg-retro-orange/20" />
            <div className="absolute left-0 top-3 -translate-x-1/2">
              <Star className="h-4 w-4 text-retro-orange" fill="currentColor" />
            </div>
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/50">
              <h3 className="font-retro text-xl mb-2">{period.title}</h3>
              <p className="text-gray-600">{period.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
