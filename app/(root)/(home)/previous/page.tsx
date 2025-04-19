import CallList from "@/components/CallList";
import Image from "next/image";
import ICONS from "@/public/icons";

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-5 px-4 py-6">
      {/* Header with icon and title */}
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-gradient-to-br from-amber-500/30 to-orange-600/30 p-3 rounded-xl">
          <Image
            src={ICONS.PREVIOUS}
            alt="Previous calls"
            width={28}
            height={28}
            className="opacity-90"
          />
        </div>
        <h1 className="text-3xl font-bold text-white">Previous Calls</h1>
      </div>

   

      <div className="bg-gradient-to-b from-dark-3/50 to-dark-1/30 rounded-xl p-6 backdrop-blur-sm border border-white/5">
        <CallList type="ended" />
      </div>
    </section>
  );
};

export default PreviousPage;
