import { Sparkles } from "lucide-react";
import EventCard from "./(components)/event-card";
import Link from "next/link";

export default function HackathonPage() {
  return (
    <div className="min-h-[90vh] grid lg:grid-cols-2 items-center gap-8 px-6 lg:px-20 py-12">
      {/* 左侧文本内容 */}
      <div className="space-y-6 text-center lg:text-left">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
          MINI HACKATHON
          <br />
          THAT ARE OUT OF
          <br />
          THIS WORLD
          <Sparkles className="inline-block ml-2 w-10 sm:w-12 h-10 sm:h-12 text-yellow-300" />
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0">
          Join CFC Studio's innovative hackathon where creativity meets code.
          Transform your ideas into reality and compete with fellow developers
          in this exciting <strong>120-hour</strong> coding adventure.
        </p>

        {/* 按钮组 */}
        <div className="flex justify-center lg:justify-start mt-4">
          <Link
            href="/hackathon/details"
            className="relative inline-flex items-center justify-center w-40 sm:w-48 px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-bold transition-all duration-500 hover:-translate-y-1 group min-w-[400px]"
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity blur-[2px]" />
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-lg border border-white/20 transition-all group-hover:border-cyan-300/50" />
            <span className="relative bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent tracking-wide">
              Learn more
            </span>
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <div className="absolute -top-[100%] left-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-neon-sparkle" />
              <div className="absolute -bottom-[100%] right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-neon-sparkle" />
            </div>
          </Link>
        </div>
      </div>

      {/* 右侧图片或事件卡片 */}
      <div className="flex justify-center lg:justify-end relative w-full mt-6 lg:mt-0">
        <EventCard
          eventName="CFC Mini Hackathon 2025"
          registrationEnd="2025-02-24T00:00:00"
          startDate="2025-02-24T00:00:00"
          eventEndDate="2025-03-07T00:00:00"
          minTeamSize={1}
          maxTeamSize={4}
        />
      </div>
    </div>
  );
}
