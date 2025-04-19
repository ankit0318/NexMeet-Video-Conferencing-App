import CallList from "@/components/CallList";
import Image from "next/image";
import ICONS from "@/public/icons";

const UpcomingPage = () => {
  return (
    <section className="flex size-full flex-col gap-5 px-4 py-6">
      {/* Header with icon and title */}
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-gradient-to-br from-blue-500/30 to-indigo-600/30 p-3 rounded-xl">
          <Image
            src={ICONS.UPCOMING}
            alt="Upcoming meetings"
            width={28}
            height={28}
            className="opacity-90"
          />
        </div>
        <h1 className="text-3xl font-bold text-white">Upcoming Meetings</h1>
      </div>

     

      <div className="bg-gradient-to-b from-dark-3/50 to-dark-1/30 rounded-xl p-6 backdrop-blur-sm border border-white/5 shadow-xl">
        <CallList type="upcoming" />
      </div>
    </section>
  );
};

export default UpcomingPage;
