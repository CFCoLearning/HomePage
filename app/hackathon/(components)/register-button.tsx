"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { RegisterForm } from "./register-form";

interface RegisterButtonProps {
  isRegistrationEnded: boolean;
  eventName: string;
}

export function RegisterButton({
  isRegistrationEnded,
  eventName,
}: RegisterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
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
            开启你的 {eventName} 之旅
          </DialogTitle>
          <DialogDescription className="text-white/60">
            填写以下信息完成报名，我们会通过邮件通知你后续的活动安排。
          </DialogDescription>
        </DialogHeader>
        <RegisterForm onCloseAction={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
