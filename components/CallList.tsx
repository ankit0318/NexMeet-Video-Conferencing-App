'use client';

import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from './ui/Loader';
import { useGetCalls } from '@/hooks/useGetCall';
import Image from 'next/image';

// Simple Card component to replace MeetingCard
const SimpleCard = ({
  icon,
  title,
  date,
  buttonText,
  buttonIcon1,
  handleClick,
}: {
  icon: string;
  title: string;
  date?: string;
  buttonText: string;
  buttonIcon1?: string;
  handleClick: () => void;
}) => (
  <div className="bg-[#19232d] rounded-xl p-4 flex flex-col text-white shadow-lg">
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-lg">
        <Image src={icon} alt="icon" width={24} height={24} />
      </div>
    </div>
    
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {date && <p className="text-sm text-white/70">{date}</p>}
    </div>
    
    <button 
      onClick={handleClick}
      className="mt-auto bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg py-2 px-4 flex items-center justify-center"
    >
      {buttonIcon1 && (
        <Image src={buttonIcon1} alt="icon" width={18} height={18} className="mr-2" />
      )}
      <span>{buttonText}</span>
    </button>
  </div>
);

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'upcoming':
        return 'No Upcoming Calls';
      case 'recordings':
        return 'No Recordings';
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  if (isLoading) return <Loader/>;

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <SimpleCard
            key={(meeting as Call).id || (meeting as CallRecording).session_id}
            icon={
              type === 'ended'
                ? '/icons/previous.svg'
                : type === 'upcoming'
                  ? '/icons/upcoming.svg'
                  : '/icons/recordings.svg'
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              'No Description'
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={
              type === 'recordings'
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />          
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;