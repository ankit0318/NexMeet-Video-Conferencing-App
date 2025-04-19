"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ICONS from "@/public/icons";

import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-3 xl:flex-row bg-dark-1/50 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32 flex items-center">
        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
        {title}:
      </h1>
      <h1 className="truncate text-sm  max-sm:max-w-[320px] lg:text-xl text-sky-1">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const meetingId = user?.id;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className="flex size-full flex-col gap-8 px-4 py-6">
      {/* Header with icon and title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-br from-green-500/30 to-teal-600/30 p-3 rounded-xl">
          <Image
            src={ICONS.ADD_PERSONAL}
            alt="Personal Room"
            width={28}
            height={28}
            className="opacity-90"
          />
        </div>
        <h1 className="text-3xl font-bold text-white">Personal Meeting Room</h1>
      </div>


      <div className="bg-gradient-to-b from-dark-3/50 to-dark-1/30 rounded-xl p-6 backdrop-blur-sm border border-white/5 shadow-xl">
        <div className="flex w-full flex-col gap-5 xl:max-w-[900px]">
          <Table
            title="Topic"
            description={`${user?.fullName}'s Meeting Room`}
          />
          <Table title="Meeting ID" description={meetingId!} />
          <Table title="Invite Link" description={meetingLink} />
        </div>
        <div className="flex flex-wrap gap-5 mt-8">
          <Button
            className="bg-blue-1 hover:bg-blue-600 text-white font-semibold px-6 py-5 text-lg rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-900/20"
            onClick={startRoom}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="10 8 16 12 10 16 10 8"></polygon>
            </svg>
            Start Meeting
          </Button>
          <Button
            className="bg-dark-3 hover:bg-dark-4 text-white font-semibold px-6 py-5 text-lg rounded-xl transition-all duration-300 flex items-center gap-2"
            onClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast("Link Copied");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy Invitation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PersonalRoom;
