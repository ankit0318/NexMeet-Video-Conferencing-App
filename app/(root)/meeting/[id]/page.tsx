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

// Update the props type to match Next.js App Router requirements
type PageProps = {
  params: {
    id: string;
  };
};

function Meeting({ params }: PageProps) {
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
