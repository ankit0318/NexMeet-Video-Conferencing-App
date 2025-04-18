"use client";

// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

// Memoize the MobileNavBar component to prevent unnecessary re-renders
const MobileNavBar = memo(() => {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 z-50 w-full overflow-hidden bg-dark-1 border-t border-neutral-800">
      <div className="flex justify-around py-3">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route;

          return (
            <Link
              href={link.route}
              prefetch={true}
              key={link.label}
              className={`flex flex-col items-center gap-1 p-2 ${
                isActive ? "text-white" : "text-neutral-400"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
                className={`${isActive ? "brightness-110" : "opacity-80"}`}
                priority={isActive}
              />
              <p className="text-xs">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </nav>
  );
});

MobileNavBar.displayName = "MobileNavBar";

export default MobileNavBar;
