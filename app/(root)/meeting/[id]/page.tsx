/* -------------------------------------------------------------------------- */
// *this is client componnent
/* -------------------------------------------------------------------------- */
"use client";


import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import Loader from "@/components/ui/Loader";
import { useGetCallById } from "@/hooks/useGetCallById";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useState } from "react";

function Meeting() {
  const { id } = useParams();
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (typeof id !== "string") {
    throw new Error("Invalid meeting ID");
  }

  const { call, isLoading } = useGetCallById(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      
      <StreamCall call={call}>
       
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </>
  );
}

export default Meeting;
