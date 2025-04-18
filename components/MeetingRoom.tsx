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
    <div className="flex h-screen w-full flex-col md:flex-row items-start justify-between p-4 text-white">
      <div className="flex flex-col w-full md:w-4/5 h-full items-center justify-between gap-4">
        <div className="w-full h-[70vh] rounded-xl overflow-hidden">
          <CallLayout />
        </div>

        <div className="flex items-center justify-center gap-4 mt-4">
          <CallControls />

          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] transition-colors">
                <LayoutList size={20} className="text-white" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
              {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    onClick={() =>
                      setLayout(item.toLowerCase() as callLayoutType)
                    }
                  >
                    {item}
                  </DropdownMenuItem>
                  {index < 2 && (
                    <DropdownMenuSeparator className="border-dark-1" />
                  )}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={() => setshowParticipants((prev) => !prev)}
            className="cursor-pointer rounded-xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] transition-colors"
            aria-label="Toggle participants panel"
          >
            <User size={20} className="text-white" />
          </button>

          <CallStatsButton />

          {!isPersonalRoom && (<EndCallButton/>)} 

        </div>
      </div>

      <div
        className={`${
          showParticipants ? "block" : "hidden"
        } md:w-1/5 h-full pl-4`}
      >
        <div className="bg-[#19232d] h-full rounded-xl overflow-hidden">
          <CallParticipantsList onClose={() => setshowParticipants(false)} />
        </div>
      </div>
    </div>
  );
}

export default MeetingRoom;
