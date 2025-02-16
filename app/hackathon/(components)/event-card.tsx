"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Calendar, Users, Timer } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RegisterForm } from "./register-form";

interface EventCardProps {
  eventImage?: string;
  eventName: string;
  endDate: string;
  minTeamSize: number;
  maxTeamSize: number;
}

export default function EventCard({
  eventImage,
  eventName,
  endDate,
  minTeamSize,
  maxTeamSize,
}: EventCardProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(endDate) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const isRegistrationEnded = +new Date(endDate) - +new Date() <= 0;

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 shadow-xl">
      {/* Event Image */}
      <div className="relative h-64 w-full">
        <Image
          src={eventImage || "/assets/hackathon/default-hackathon-cover.svg"}
          alt={eventName}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-2">{eventName}</h3>
        </div>
      </div>

      {/* Event Info */}
      <div className="p-6 space-y-6">
        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-2 text-center">
          {Object.entries(timeLeft).map(([key, value]) => (
            <div
              key={key}
              className="bg-white/5 rounded-lg p-2 backdrop-blur-sm border border-white/5"
            >
              <div className="text-2xl font-mono text-green-400">
                {String(value).padStart(2, "0")}
              </div>
              <div className="text-xs text-white/60 uppercase">{key}</div>
            </div>
          ))}
        </div>

        {/* Event Details */}
        <div className="space-y-3">
          <div className="flex items-center text-white/80">
            <Calendar className="w-5 h-5 mr-2 text-green-400" />
            <span>
              Registration ends: {new Date(endDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center text-white/80">
            <Users className="w-5 h-5 mr-2 text-green-400" />
            <span>
              Team size: {minTeamSize}-{maxTeamSize} developers
            </span>
          </div>
          <div className="flex items-center text-white/80">
            <Timer className="w-5 h-5 mr-2 text-green-400" />
            <span>24 hours hackathon</span>
          </div>
        </div>

        {/* Register Button */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger
            className="block w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg text-center transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isRegistrationEnded}
          >
            {isRegistrationEnded ? "Registration Deadline" : "Register Now"}
          </DialogTrigger>
          <DialogContent className="max-w-md bg-gradient-to-b from-gray-900 to-gray-800 border-white/10">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                开启你的 Hackathon 之旅
              </DialogTitle>
            </DialogHeader>
            <RegisterForm onCloseAction={handleClose} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
