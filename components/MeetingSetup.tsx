/* -------------------------------------------------------------------------- */
//*client componnent
/* -------------------------------------------------------------------------- */
"use client";

import {
  DeviceSettings,
  useCall,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

function MeetingSetup({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (isSetupComplete: boolean) => void;
}) {
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);
  const { useCallStartsAt, useCallEndedAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndsAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callTimeExpired = callEndsAt && new Date(callEndsAt) < new Date();
  const callHasEnded = !!callEndsAt && callTimeExpired;
  const call = useCall();

  /* -------------------------------------------------------------------------- */
  //*SAFTEY CHECKS
  /* -------------------------------------------------------------------------- */

  if (!call)
    throw new Error("useCall is not available in this stream call context");

  if (callTimeNotArrived)
    alert(
      `Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`
    );
  if (callHasEnded) alert("The call has already ended.");

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 text-white bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-4xl bg-gray-800 bg-opacity-50 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
        <h1 className="text-center text-3xl font-bold mb-8">Meeting Setup</h1>

        <div className="w-full mb-8">
          <div className="aspect-video w-full max-h-[60vh] rounded-xl overflow-hidden shadow-md border border-gray-700">
            <VideoPreview />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <label className="flex items-center justify-center gap-3 font-medium text-lg cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 accent-green-500"
              checked={isMicCamToggled}
              onChange={(e) => setIsMicCamToggled(e.target.checked)}
            />
            <span>Join with mic and camera off</span>
          </label>

          <div className="bg-gray-700 rounded-lg p-1 shadow-md border border-gray-600">
            <DeviceSettings />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="rounded-lg bg-green-600 hover:bg-green-700 px-8 py-3 text-lg font-semibold transition-colors duration-300 shadow-lg"
            onClick={() => {
              call.join();
              setIsSetupComplete(true);
            }}
          >
            Join Meeting
          </button>
        </div>
      </div>
    </div>
  );
}

export default MeetingSetup;
