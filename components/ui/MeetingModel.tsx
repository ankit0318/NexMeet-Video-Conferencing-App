"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface MeetingModelProps {
  trigger?: React.ReactNode;
  title?: string;
  buttonText?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  handleOnClick?: () => void;
  isOpen?: boolean;
  image?: React.ReactNode;
  buttonIcon?: React.ReactNode;
  
}

const MeetingModel = ({
  trigger,
  title,
  buttonText,
  description,
  children,
  handleOnClick,
  className,
  isOpen,
  image,
  buttonIcon
}: MeetingModelProps) => {
  const [open, setOpen] = useState(isOpen || false);

  // Update internal state when isOpen prop changes
  useEffect(() => {
    if (isOpen !== undefined) {
      setOpen(isOpen);
    }
  }, [isOpen]);

  const onClick = () => {
    handleOnClick?.(); // run your callback
    setOpen(false); // close modal
  };

  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="w-full bg-dark-1 text-white border-none max-w-[90%] md:max-w-[50%] lg:max-w-[35%] p-8 ">
        <DialogHeader>
          <DialogTitle
            className={cn(" flex justify-center items-center flex-col text-3xl font-bold leading-[42px]", className)}
          >
            {image}
            {title}
          </DialogTitle>
          <DialogDescription>{description || children}</DialogDescription>
        </DialogHeader>

        <button
          onClick={onClick}
          className="bg-blue-1 flex justify-center items-center gap-2 border-none focus:outline-none rounded-lg h-9"
        >
          {buttonText}{buttonIcon}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModel;
