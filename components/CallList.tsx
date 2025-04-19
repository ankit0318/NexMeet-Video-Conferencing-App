"use client";

import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./ui/Loader";
import { useGetCalls } from "@/hooks/useGetCall";
import SimpleCard from "./ui/SimpleCard";
import ICONS from "@/public/icons";
import Image from "next/image";

// Simple Card component to replace MeetingCard

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      case "recordings":
        return "No Recordings";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  if (isLoading) return <Loader />;

  /* -------------------------------------------------------------------------- */
  //*calls store type of call (ended, upcoming, recordings) and their data
  /* -------------------------------------------------------------------------- */
  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  2xl:grid-cols-4 gap-6">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => {
          // Type Guard to differentiate between Call and CallRecording
          const isCall = (meeting as Call).id;
          const isCallRecording = (meeting as CallRecording).session_id;

          // Set the link based on the type
          const link = isCall
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                (meeting as Call).id
              }`
            : isCallRecording
            ? `${(meeting as CallRecording).url}`
            : "";

          // Set the title based on the type
          const title =
            (meeting as Call).state?.custom?.description ||
            (meeting as CallRecording).filename?.substring(0, 20) ||
            "No Description";

          // Set the date based on the type
          const date =
            (meeting as Call).state?.startsAt?.toLocaleString() ||
            (meeting as CallRecording).start_time?.toLocaleString();

          // Set button text and icon based on type
          const buttonIcon1 =
            type === "recordings" ? "/icons/play.svg" : undefined;
          const buttonText = type === "recordings" ? "Play" : "Start";

          // Set handleClick based on type
          const handleClick =
            type === "recordings"
              ? () => router.push(`${(meeting as CallRecording).url}`)
              : () => router.push(`/meeting/${(meeting as Call).id}`);

          return (
            <SimpleCard
              key={
                isCall
                  ? (meeting as Call).id
                  : (meeting as CallRecording).session_id
              }
              icon={
                type === "ended"
                  ? ICONS.PREVIOUS
                  : type === "upcoming"
                  ? ICONS.UPCOMING
                  : ICONS.RECORDINGS
              }
              link={link}
              title={title}
              date={date}
              buttonIcon1={buttonIcon1}
              buttonText={buttonText}
              handleClick={handleClick}
            />
          );
        })
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center bg-dark-3/30 rounded-xl backdrop-blur-sm border border-white/5">
          <div className="w-16 h-16 mb-6 rounded-full bg-dark-4/50 flex items-center justify-center">
            <Image
              src={
                type === "recordings"
                  ? ICONS.RECORDINGS
                  : type === "upcoming"
                  ? ICONS.UPCOMING
                  : ICONS.PREVIOUS
              }
              alt="Icon"
              className="w-8 h-8 opacity-70"
              width={32}
              height={32}
            />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {noCallsMessage}
          </h1>
          <p className="text-gray-400 max-w-md">
            {type === "recordings"
              ? "When you record meetings, they will appear here for you to review."
              : type === "upcoming"
              ? "Schedule a meeting to see it appear in this list."
              : "Your completed meetings will be shown here."}
          </p>
        </div>
      )}
    </div>
  );
};
export default CallList;
