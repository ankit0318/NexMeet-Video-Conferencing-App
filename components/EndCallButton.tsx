import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react'

function EndCallButton() {

const {useLocalParticipant} = useCallStateHooks();
const router = useRouter();
const localParticipant = useLocalParticipant();
const call = useCall();
if(!call) return null;
const isMeetingOwner = localParticipant && call.state.createdBy && localParticipant.userId === call.state.createdBy.id;
if (!isMeetingOwner) return null;
const handleEndCall = async () => {
    await call.endCall();
    router.push("/");
    

}
  
return (
    <button onClick={handleEndCall} className="cursor-pointer rounded-xl bg-red-600 px-4 py-2 hover:bg-red-700 transition-colors" aria-label="End call">
        End Call For Everyone
    </button>
)
}

export default EndCallButton