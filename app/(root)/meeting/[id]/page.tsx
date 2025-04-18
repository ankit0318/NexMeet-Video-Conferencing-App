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

// Use a different name to avoid conflicts with Next.js built-in types
type MeetingPageParams = {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function Meeting({ params }: MeetingPageParams) {
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
