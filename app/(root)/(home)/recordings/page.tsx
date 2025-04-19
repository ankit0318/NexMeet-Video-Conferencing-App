import CallList from "@/components/CallList";
import Image from "next/image";
import ICONS from "@/public/icons";

const RecordingsPage = () => {
  return (
    <section className="flex size-full flex-col gap-5 px-4 py-6">
      {/* Header with icon and title */}
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-gradient-to-br from-purple-500/30 to-fuchsia-600/30 p-3 rounded-xl">
          <Image
            src={ICONS.RECORDINGS}
            alt="Recordings"
            width={28}
            height={28}
            className="opacity-90"
          />
        </div>
        <h1 className="text-3xl font-bold text-white">Recordings</h1>
      </div>

    
      <div className="bg-gradient-to-b from-dark-3/50 to-dark-1/30 rounded-xl p-6 backdrop-blur-sm border border-white/5 shadow-xl">
        <CallList type="recordings" />
      </div>
    </section>
  );
};

export default RecordingsPage;
