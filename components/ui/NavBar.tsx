import React from "react";
import Link from "next/link";
import Image from "next/image";
import ICONS from "@/public/icons";
import { SignedIn, UserButton } from "@clerk/nextjs";
import MobileNavBar from "./MobileNavBar";

const NavBar = () => {
  return (
    <nav className="bg-dark-1 py-1">
      <div className="flex justify-between mx-3 items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">
            <Image
              src={ICONS.VIDEO_CAMERA_PNG}
              alt="Video Conferencing Logo"
              className="inline-block  mr-2"
              width={50}
              height={50}
            />
            NexMeet
          </Link>
        </div>

        <div>
          <MobileNavBar />
          <SignedIn>
            <UserButton appearance={{
    elements: {
      userButtonPopoverCard: "mt-6",
      userButtonPopoverActionButton: "text-white hover:text-red-500", // increases top margin (moves dropdown down)
    },
  }}/>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
