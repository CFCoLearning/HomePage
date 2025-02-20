"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Calendar, Users, Timer } from "lucide-react";
import { RegisterButton } from "./register-button";

interface EventCardProps {
  eventImage?: string;
  eventName: string;
  registrationEnd: string; // 报名截止时间
  startDate: string; // 活动开始时间
  eventEndDate: string; // 活动截止时间
  minTeamSize: number;
  maxTeamSize: number;
}

export default function EventCard({
  eventImage,
  eventName,
  registrationEnd,
  startDate,
  eventEndDate,
  minTeamSize,
  maxTeamSize,
}: EventCardProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [countdownLabel, setCountdownLabel] = useState("");
  const [colorClass, setColorClass] = useState("text-green-400");
  // const [isOpen, setIsOpen] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = +new Date();
      const registrationEndTime = +new Date(registrationEnd);
      const startTime = +new Date(startDate);
      const eventEndTime = +new Date(eventEndDate);

      let targetTime = 0;
      let label = "";
      let color = "text-green-400";

      if (now < registrationEndTime) {
        targetTime = registrationEndTime;
        label = "报名截止";
        color = "text-green-400";
      } else if (now < startTime) {
        targetTime = startTime;
        label = "活动开始";
        color = "text-blue-400";
      } else if (now < eventEndTime) {
        targetTime = eventEndTime;
        label = "活动截止";
        color = "text-purple-400";
      } else {
        label = "活动已结束";
        color = "text-gray-400";
        setIsEnded(true); // 设置活动已结束状态
      }

      setCountdownLabel(label);
      setColorClass(color);

      if (targetTime > 0 && !isEnded) {
        const difference = targetTime - now;
        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          });
          return;
        }
      }
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [registrationEnd, startDate, eventEndDate]);

  const isRegistrationEnded = new Date() >= new Date(registrationEnd);

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
        <div className="space-y-3">
          <div className={`text-center text-sm font-semibold ${colorClass}`}>
            {isEnded
              ? "活动已结束"
              : countdownLabel && `距离${countdownLabel}还有`}
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            {Object.entries(timeLeft).map(([key, value]) => (
              <div
                key={key}
                className="bg-white/5 rounded-lg p-2 backdrop-blur-sm border border-white/5"
              >
                <div className={`text-2xl font-mono ${colorClass}`}>
                  {String(value).padStart(2, "0")}
                </div>
                <div className="text-xs text-white/60 uppercase">{key}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-3">
          {/* 使用网格布局实现精确对齐 */}
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 text-white/80">
            <Calendar className="w-5 h-5 text-green-400" />
            <div className="flex justify-between font-mono">
              <span className="pr-4">Registration ends:</span>
              <span>
                {new Date(registrationEnd)
                  .toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  .replace(/-/g, "/")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 text-white/80">
            <Calendar className="w-5 h-5 text-blue-400" />
            <div className="flex justify-between font-mono">
              <span className="pr-4">START AT:</span>
              <span>
                {new Date(startDate)
                  .toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  .replace(/-/g, "/")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 text-white/80">
            <Calendar className="w-5 h-5 text-purple-400" />
            <div className="flex justify-between font-mono">
              <span className="pr-4">ENDED AT:</span>
              <span>
                {new Date(eventEndDate)
                  .toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  .replace(/-/g, "/")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 text-white/80">
            <Users className="w-5 h-5 text-green-400" />
            <div className="flex justify-between font-mono">
              <span className="pr-4">Team size:</span>
              <span>
                {minTeamSize}-{maxTeamSize} developers
              </span>
            </div>
          </div>
        </div>

        {/* Register Button */}
        <RegisterButton
          isRegistrationEnded={isRegistrationEnded}
          eventName={eventName}
        />
      </div>
    </div>
  );
}
