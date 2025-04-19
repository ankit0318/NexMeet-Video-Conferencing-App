import React from "react";
import Link from "next/link";
import Image from "next/image";
import ICONS from "@/public/icons";
import { SignedIn, UserButton } from "@clerk/nextjs";


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

        <div >
          <SignedIn>
            <UserButton  />
          </SignedIn>

          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
