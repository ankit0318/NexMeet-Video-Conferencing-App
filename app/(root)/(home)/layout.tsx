// import MobileNavBar from "@/components/ui/MobileNavBar";
import NavBar from "@/components/ui/NavBar";
// import NavBar from "@/components/ui/NavBar";
import SideBar from "@/components/ui/SideBar";
import React from "react";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </div>
      <div className="fixed top-3 left-0 h-screen">
        <SideBar />
      </div>
      <div className="md:ml-20 lg:ml-64 pt-16">{children}</div>
    </>
  );
}

export default HomeLayout;
