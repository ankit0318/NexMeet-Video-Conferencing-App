"use client";

import { useState } from "react";
import { useGetCallById } from "@/hooks/useGetCallById";
import Loader from "@/components/ui/Loader";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";

function Meeting({ id }: { id: string }) {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isLoading } = useGetCallById(id);

  if (isLoading) return <Loader />;

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
        ) : (
          <MeetingRoom />
        )}
      </StreamTheme>
    </StreamCall>
  );
}

export default Meeting;
