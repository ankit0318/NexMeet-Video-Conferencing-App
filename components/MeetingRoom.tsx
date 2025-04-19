import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import React, { useState } from "react";
import { LayoutList, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./ui/Loader";

type callLayoutType = "grid" | "speaker-left" | "speaker-right";

function MeetingRoom() {
  const searchParams = useSearchParams();
  const isPersonalRoom = searchParams.get("personal") === "true";

  const [showParticipants, setshowParticipants] = useState(false);
  const [layout, setLayout] = useState<callLayoutType>("speaker-left");
  const { useCallCallingState } = useCallStateHooks();

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"left"} />;
      default:
        return <SpeakerLayout participantsBarPosition={"right"} />;
    }
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row items-start justify-between p-4 text-white bg-gradient-to-b from-dark-2 to-dark-1">
      {/* Main content area */}
      <div
        className={`flex flex-col w-full ${
          showParticipants ? "md:w-3/4 lg:w-4/5" : "md:w-full"
        } h-full items-center justify-between gap-4 transition-all duration-300`}
      >
        {/* Video container with enhanced styling */}
        <div className="w-full h-[70vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none h-16"></div>
          <CallLayout />
        </div>

        {/* Controls bar with glassmorphism effect */}
        <div className="flex items-center justify-center gap-4 mt-2 p-3 bg-dark-3/50 backdrop-blur-md rounded-xl border border-white/5 shadow-lg">
          {/* Call controls wrapper */}
          <div className="flex-1">
            <CallControls />
          </div>

          {/* Layout dropdown with enhanced styling */}
          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-xl bg-dark-4/80 px-4 py-2 hover:bg-blue-1/30 transition-colors flex items-center gap-2 border border-white/10">
                <LayoutList size={20} className="text-white" />
                <span className="hidden sm:inline text-sm font-medium">
                  Layout
                </span>
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="border-dark-1 bg-dark-1/90 backdrop-blur-md text-white">
              {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    className="hover:bg-blue-1/20 flex items-center gap-2 cursor-pointer"
                    onClick={() =>
                      setLayout(item.toLowerCase() as callLayoutType)
                    }
                  >
                    {layout === item.toLowerCase() && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    )}
                    {item}
                  </DropdownMenuItem>
                  {index < 2 && (
                    <DropdownMenuSeparator className="border-dark-1" />
                  )}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Participants button with enhanced styling */}
          <button
            onClick={() => setshowParticipants((prev) => !prev)}
            className={`cursor-pointer rounded-xl ${
              showParticipants
                ? "bg-blue-1/30 border-blue-400/30"
                : "bg-dark-4/80 hover:bg-blue-1/20 border-white/10"
            } px-4 py-2 transition-colors flex items-center gap-2 border`}
            aria-label="Toggle participants panel"
          >
            <User size={20} className="text-white" />
            <span className="hidden sm:inline text-sm font-medium">People</span>
          </button>

          {/* Call stats button styled to match */}
          <div className="hidden sm:block">
            <CallStatsButton />
          </div>

          {/* End call button */}
          {!isPersonalRoom && <EndCallButton />}
        </div>
      </div>

      {/* Participants panel with slide animation */}
      <div
        className={`${
          showParticipants ? "block" : "hidden"
        } md:w-1/4 lg:w-1/5 h-full pl-4 transition-all duration-300 ease-in-out`}
      >
        <div className="bg-dark-1/90 backdrop-blur-md h-full rounded-xl overflow-hidden border border-white/10 shadow-lg">
          <CallParticipantsList onClose={() => setshowParticipants(false)} />
        </div>
      </div>
    </div>
  );
}

export default MeetingRoom;
