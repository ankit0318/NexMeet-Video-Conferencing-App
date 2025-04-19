"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useCallback } from "react";

function SideBar() {
  const pathname = usePathname();

  // Memoize the navigation item to prevent unnecessary re-renders
  const NavItem = useCallback(
    ({
      link,
      index,
    }: {
      link: { route: string; imgURL: string; label: string };
      index: number;
    }) => {
      const isActive =
        pathname === link.route ||
        (link.route !== "/" && pathname.startsWith(link.route));

      return (
        <Link
          href={link.route}
          key={index}
          prefetch={true}
          className={`flex items-center md:gap-3 gap-0 px-4 py-3 rounded-lg transition-all duration-200  ${
            isActive ? "bg-blue-600 text-white font-medium" : "text-gray-300"
          } ${!isActive && "justify-center md:justify-start hover:bg-gray-800"}`}
        >
          <div className="flex items-center justify-center w-6 h-6">
            <Image
              src={link.imgURL}
              alt={link.label}
              width={20}
              height={20}
              className={`${isActive ? "brightness-110" : "opacity-80"}`}
              priority={isActive}
            />
          </div>
          <span className="text-sm lg:block hidden">{link.label}</span>
        </Link>
      );
    },
    [pathname]
  );

  return (
    <aside className="h-screen pt-16 bg-dark-1 text-white shadow-lg sm:flex md:flex-col py-8 px-4 lg:w-64 w-20 transition-all duration-300 hidden">
      <nav className="flex-1 space-y-2">
        {sidebarLinks.map((link, index) => (
          <React.Fragment key={index}>
            <NavItem link={link} index={index} />
          </React.Fragment>
        ))}
      </nav>
    </aside>
  );
}
export default SideBar;
