import React from "react";
import Image from "next/image";
import ClockDisplay from "@/components/ui/ClockDisplay";
import MeetingCard from "@/components/ui/MeetingCard";
import ICONS from "@/public/icons";

// Meeting card data
const meetingCards = [
  {
    title: "New Meeting",
    description: "Start an instant meeting",
    color: "bg-[#FF7A50]",
    icon: <Image src={ICONS.ADD_MEETING} alt="New Meeting" width={24} height={24} />,
  },
  {
    title: "Schedule Meeting",
    description: "Plan your meeting",
    color: "bg-[#247AFD]",
    icon: <Image src={ICONS.SCHEDULE} alt="Schedule Meeting" width={24} height={24} />,
  },
  {
    title: "View Recordings",
    description: "Check out your recordings",
    color: "bg-[#BC31EA]",
    icon: <Image src={ICONS.RECORDINGS} alt="View Recordings" width={24} height={24} />,
  },
  {
    title: "Join Meeting",
    description: "via invitation link",
    color: "bg-[#FFC224]",
    icon: <Image src={ICONS.JOIN_MEETING} alt="Join Meeting" width={24} height={24} />,
  },
];

function Home() {
  return (
    
    <div className="min-h-screen  py-8 px-4 md:px-8  max-md:mb-16">
      {/* Clock display with hero background */}
      <ClockDisplay />

      {/* Meeting options cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {meetingCards.map((card, index) => (
          <MeetingCard
            key={index}
            title={card.title}
            description={card.description}
            color={card.color}
            icon={card.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
