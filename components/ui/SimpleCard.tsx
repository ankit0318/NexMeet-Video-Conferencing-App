import Image from "next/image";
import { toast } from "sonner";

const SimpleCard = ({
  icon,
  title,
  date,
  buttonText,
  buttonIcon1,
  handleClick,
  link,
}: {
  link: string;
  icon: string;
  title: string;
  date?: string;
  buttonText: string;
  buttonIcon1?: string;
  handleClick: () => void;
}) => (
  <div className="bg-gradient-to-br from-dark-3/80 to-dark-4/70 rounded-2xl p-6 flex flex-col text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/5 backdrop-blur-sm h-full group hover:translate-y-[-2px]">
    <div className="flex items-start justify-between mb-5">
      <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500/30 to-indigo-600/30 rounded-xl shadow-inner">
        <Image
          src={icon}
          alt="icon"
          width={24}
          height={24}
          className="opacity-90 group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="flex items-center space-x-1">
        <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></div>
        <span className="text-xs text-green-300">Active</span>
      </div>
    </div>

    <div className="mb-6 flex-grow">
      <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
        {title}
      </h3>
      {date && (
        <p className="text-sm text-white/70 flex items-center gap-1.5 bg-dark-1/30 py-1.5 px-2.5 rounded-full w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-70"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {date}
        </p>
      )}
    </div>

    <div className="flex flex-col sm:flex-row gap-2 mt-auto">
      <button
        onClick={handleClick}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 rounded-lg py-2.5 px-4 flex items-center justify-center font-medium shadow-lg shadow-blue-700/20 w-full group-hover:shadow-blue-700/40"
      >
        {buttonIcon1 && (
          <Image
            src={buttonIcon1}
            alt="icon"
            width={18}
            height={18}
            className="mr-2"
          />
        )}
        <span>{buttonText}</span>
      </button>

      <button
        onClick={() => {
          navigator.clipboard.writeText(link);
          toast("Link copied to clipboard");
        }}
        className="bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-300 rounded-lg py-2.5 px-4 flex items-center justify-center font-medium w-full group-hover:border-white/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <span>Copy Link</span>
      </button>
    </div>
  </div>
);

export default SimpleCard;
