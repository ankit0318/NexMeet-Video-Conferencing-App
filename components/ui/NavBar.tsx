"use client";

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

// Memoize the NavBar component to prevent unnecessary re-renders
const NavBar = memo(() => {
  const { user } = useUser();

  return (
    <header className="fixed w-full top-0 z-50 bg-dark-1/95 backdrop-blur-sm border-b border-neutral-800">
      <div className="flex items-center justify-between py-3 px-4 md:px-8">
        <Link href="/" prefetch={true} className="flex items-center gap-3">
          <Image
            src="/icons/logo.svg"
            alt="NexMeet Logo"
            width={36}
            height={36}
            priority
          />
          <h1 className="text-white text-xl font-bold hidden sm:block">
            NexMeet
          </h1>
        </Link>

        {user && (
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <p className="text-neutral-300 text-sm">
                {user.username || user.firstName || "User"}
              </p>
            </div>

            <Link href="/user-profile" prefetch={true}>
              <div className="w-9 h-9 rounded-full overflow-hidden border border-neutral-700">
                <Image
                  src={user.imageUrl || "/images/avatar-1.jpeg"}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
});

NavBar.displayName = "NavBar";

export default NavBar;
