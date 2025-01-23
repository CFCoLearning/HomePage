import { Cloud, Sparkles, BookOpen, GraduationCap } from "lucide-react";
import ProjectOverview from "./components/project-overview";
import Timeline from "./components/time-line";
import CourseContent from "./components/course-content";
import CheckInTable from "./components/checkIn-table";

export default function Demo2() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-retro-mint via-retro-sand to-retro-peach p-6 relative overflow-hidden font-mono">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 bg-white/50 backdrop-blur-3xl" />
      <div className="absolute top-20 right-20 animate-float">
        <Cloud className="w-24 h-24 text-white/50" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float-slow">
        <Cloud className="w-32 h-32 text-white/50" />
      </div>
      <div className="absolute top-1/3 left-1/4 animate-float-slower">
        <Sparkles className="w-16 h-16 text-retro-orange/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <h1 className="text-4xl md:text-5xl font-retro inline-block relative">
            <span className="bg-gradient-to-r from-retro-mint to-retro-orange bg-clip-text text-transparent">
              计算机教育中缺失的一课
            </span>
            <div className="absolute -top-6 -right-6">
              <BookOpen className="w-12 h-12 text-retro-orange animate-float" />
            </div>
          </h1>
        </div>

        <div className="space-y-24">
          {/* Project Overview Section */}
          <section className="relative">
            <div className="absolute -top-10 -left-10">
              <GraduationCap className="w-20 h-20 text-retro-orange/30 animate-float" />
            </div>
            <ProjectOverview />
          </section>

          {/* Timeline and Course Content */}
          <div className="relative">
            <div className="grid md:grid-cols-2 gap-16">
              <Timeline />
              <CourseContent />
            </div>
          </div>

          {/* Check-in Table */}
          <section className="relative">
            <div className="absolute -top-10 -right-10">
              <Sparkles className="w-16 h-16 text-retro-orange/30 animate-float-slow" />
            </div>
            <CheckInTable />
          </section>
        </div>
      </div>
    </main>
  );
}
