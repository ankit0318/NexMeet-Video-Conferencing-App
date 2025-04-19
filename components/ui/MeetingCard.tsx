"use client";
import React, { ReactNode, useState } from "react";
import MeetingModel from "./MeetingModel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import Image from "next/image";
// Add custom styles to remove the orange outline on focus
import "./datepicker-custom.css";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import ICONS from "@/public/icons";
interface MeetingCardProps {
  title: string;
  description: string;
  color: string;
  icon: ReactNode;
}

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};
const MeetingCard: React.FC<MeetingCardProps> = ({
  title,
  description,
  color,
  icon,
}) => {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [callDetails, setCallDetails] = useState<Call>();
  const [meetingLinkModal, setMeetingLinkModal] = useState(false);
  // Store the meeting ID separately to ensure it's available for the modal
  // const [currentMeetingId, setCurrentMeetingId] = useState<string>("");
  const { user } = useUser();
  const client = useStreamVideoClient();
  // Use the current meeting ID for the link
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  // const meetingLink = `http://localhost:3000/meeting/${currentMeetingId}`;
  //function to join a meeting

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast("Please select a date and time");
        return;
      }

      const id = uuidv4();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      // setCurrentMeetingId(call.id);
       /* -------------------------------------------------------------------------- */
       //*not a best way to handle if description is empty and i want to show modal meeting link
       /* -------------------------------------------------------------------------- */
      if (!values.description && title.toLocaleLowerCase() === "new meeting") {
        router.push(`/meeting/${call.id}`);
      } else {
        
        setMeetingLinkModal(true);
      }
      toast("Meeting Created");
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast.error("Failed to create meeting. Please try again.");
    }
  };

  //function to join a meeting
  const getModelContent = () => {
    // Convert title to lowercase for case-insensitive comparison
    const lowerCaseTitle = title.toLowerCase();

    switch (lowerCaseTitle) {
      case "new meeting":
        return {
          title: title,
          buttonText: "Start Meeting",
          handleOnClick: createMeeting,
          className: "text-center",
        };
      case "schedule meeting":
        return {
          title: title,
          buttonText: "Schedule Meeting",
          handleOnClick: createMeeting,
          children: (
            <>
              <div className="flex flex-col gap-2.5">
                
                <label className="text-base font-normal leading-[22.4px] text-sky-2">
                  Add a description
                </label>
                <textarea
                  className="border-none bg-dark-3 focus-visible:ring-0 focus:outline-none rounded-lg p-2 h-28"
                  value={values.description}
                  onChange={(e) =>
                    setValues({ ...values, description: e.target.value })
                  }
                />
              </div>
              <form className="flex w-full flex-col gap-2.5">
                <label className="text-base font-normal leading-[22.4px] text-sky-2">
                  Select Date and Time
                </label>
                <DatePicker
                  selected={values.dateTime}
                  onChange={(date: Date | null) =>
                    setValues({ ...values, dateTime: date! })
                  }
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full rounded bg-dark-3 p-2 focus:outline-none"
                />
              </form>
            </>
          ),
        };
      case "view recordings":
        return {
          title: title,
          buttonText: "View Recordings",
          description: "Check out your meeting recordings",
          handleOnClick: () => {router.push(`/recordings`)}, // Adjust the route as needed
        };
      case "join meeting":
        return {
          title: title,
          buttonText: "Join Meeting",

          children: (
            <input
              placeholder="Meeting link"
              onChange={(e) => setValues({ ...values, link: e.target.value })}
              className="border-none w-full focus:outline-none rounded-lg p-2 bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          ),

          handleOnClick: () => {router.push(`${values.link}`)},
        };
      default:
        return {
          title: title,
          buttonText: "Open",
          description: "Meeting options",
        };
    }
  };

  const modelContent = getModelContent();
  if (!client || !user) return <Loader />;

  return (
    <>
      <div
        className={`rounded-xl ${color} text-white p-6 shadow-lg backdrop-blur-md bg-opacity-80 hover:bg-opacity-90 transition-all cursor-pointer`}
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <MeetingModel
          title={modelContent.title}
          buttonText={modelContent.buttonText}
          description={modelContent.description}
          className={modelContent.className}
          handleOnClick={modelContent.handleOnClick}
          trigger={
            <div className="flex flex-col h-full">
              <div className="mb-auto">
                <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-lg mb-6">
                  {icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{title}</h3>
                <p className="text-sm text-white/80">{description}</p>
              </div>
            </div>
          }
        >
          {modelContent.children}
        </MeetingModel>

        <MeetingModel
          title="Meeting Created"
          image={
            <Image
              src={ICONS.CHECKED}
              alt="Schedule Meeting"
              width={80}
              height={80}
            />
          }
          buttonText="Copy Meeting Link"
          buttonIcon={
            <Image
              src={ICONS.COPY}
              alt="Schedule Meeting"
              width={20}
              height={20}
            />
          }
          className="text-center"
          isOpen={meetingLinkModal}
          handleOnClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast("Link Copied");
            setMeetingLinkModal(false);
          }}
        />
      </div>
    </>
  );
};

export default MeetingCard;
