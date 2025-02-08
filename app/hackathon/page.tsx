import { Sparkles } from "lucide-react";
import EventCard from "./(components)/event-card";
import Background from "./(components)/background";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RegisterForm } from "./(components)/register-form";

export default function HackathonPage() {
  return (
    <Background>
      <div className="min-h-[90vh] grid lg:grid-cols-2 gap-8 items-center py-12">
        {/* Left Column */}
        <div className="space-y-8">
          <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            MINI HACKATHON
            <br />
            THAT ARE OUT OF
            <br />
            THIS WORLD
            <Sparkles className="inline-block ml-2 w-12 h-12 text-yellow-300" />
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-xl">
            Join CFC Studio's innovative hackathon where creativity meets code.
            Transform your ideas into reality and compete with fellow developers
            in this exciting 120-hour（TODO） coding adventure.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#register"
              className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-black transition duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-300 to-emerald-400 rounded-lg"></span>
              <span className="relative">
                <Dialog>
                  <DialogTrigger>Register Now</DialogTrigger>
                  <DialogContent className="max-w-md bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl border-0">
                    <DialogHeader>
                      <DialogTitle>开启你的 Hackathon 之旅</DialogTitle>
                    </DialogHeader>
                    <RegisterForm />
                  </DialogContent>
                </Dialog>
              </span>
            </a>

            <a
              href="/hackathon/details"
              className="inline-flex items-center justify-center px-8 py-3 font-bold text-white border-2 border-white/20 rounded-lg backdrop-blur-sm hover:bg-white/10 transition duration-300"
            >
              Learn more
            </a>
          </div>
        </div>

        {/* Right Column - Event Card */}
        <div className="relative">
          <EventCard
            eventName="CFC Mini Hackathon 2024"
            endDate="2024-02-15T00:00:00"
            minTeamSize={2}
            maxTeamSize={4}
            registrationUrl="#register"
          />
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-400/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-violet-400/20 rounded-full blur-2xl"></div>
        </div>
      </div>
    </Background>
  );
}
