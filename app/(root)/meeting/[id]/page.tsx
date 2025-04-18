/* -------------------------------------------------------------------------- */
// *this is client componnent
/* -------------------------------------------------------------------------- */
"use client";


import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import Loader from "@/components/ui/Loader";
import { useGetCallById } from "@/hooks/useGetCallById";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";

function Meeting({ params }: { params: { id: string } }) {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isLoading } = useGetCallById(params.id);

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
