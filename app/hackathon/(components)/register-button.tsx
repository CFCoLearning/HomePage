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
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface RegisterButtonProps {
  isRegistrationEnded: boolean;
  eventName: string;
}

export function RegisterButton({
  isRegistrationEnded,
  eventName,
}: RegisterButtonProps) {
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const [isOpen, setIsOpen] = useState(false);

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (!isConnected) {
      e.preventDefault();
      toast({
        title: "Wallet Not Connected",
        description: (
          <div className="mt-2 rounded-md bg-red-950 p-4">
            <p className="text-red-200">
              请请先连接你的钱包，然后再进行报名操作。
            </p>
          </div>
        ),
        action: (
          <div className="flex items-center justify-center mt-4 h-full">
            <Button
              onClick={() => {
                open();
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg text-sm text-white transition-all duration-200 transform hover:scale-105"
            >
              Connect Now
            </Button>
          </div>
        ),
      });
      return;
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className="block w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg text-center transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isRegistrationEnded}
        onClick={handleTriggerClick}
      >
        {isRegistrationEnded ? "Registration Deadline" : "Register Now"}
      </DialogTrigger>
      <DialogContent className="max-w-md bg-gradient-to-b from-gray-900 to-gray-800 border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            开启你的 {eventName} 之旅
          </DialogTitle>
          {/* <DialogDescription className="text-white/60">
            填写以下信息完成报名，我们会通过邮件通知你后续的活动安排。
          </DialogDescription> */}
        </DialogHeader>
        <RegisterForm onCloseAction={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
