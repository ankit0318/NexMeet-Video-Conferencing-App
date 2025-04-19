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
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 text-white bg-gradient-to-b from-dark-1 to-dark-2">
      <div className="w-full max-w-4xl bg-gradient-to-b from-dark-3/70 to-dark-4/60 rounded-2xl p-8 shadow-2xl backdrop-blur-md border border-white/5">
        <h1 className="text-center text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
          Meeting Setup
        </h1>

        {/* Video Preview */}
        <div className="w-full mb-8 relative">
          <div className="aspect-video w-full max-h-[60vh] rounded-xl overflow-hidden shadow-xl border border-white/10 ring-2 ring-blue-500/20">
            <VideoPreview />
          </div>

          {/* Status indicator */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium border border-white/10">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            <span>Preview Ready</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 bg-dark-1/30 p-5 rounded-xl backdrop-blur-sm border border-white/5">
          <label className="flex items-center justify-center gap-3 font-medium text-lg cursor-pointer group transition-all duration-300">
            <div className="relative">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={isMicCamToggled}
                onChange={(e) => setIsMicCamToggled(e.target.checked)}
              />
              <div className="w-12 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-6 peer-checked:bg-blue-1 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all border border-white/10"></div>
            </div>
            <span className="group-hover:text-blue-300 transition-colors duration-300">
              Join with mic and camera off
            </span>
          </label>

          <div className="bg-dark-1/80 rounded-lg p-1.5 shadow-lg border border-white/10 hover:border-white/20 transition-all duration-300">
            <DeviceSettings />
          </div>
        </div>

        {/* Join Button */}
        <div className="flex justify-center">
          <button
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-9 py-3.5 text-lg font-semibold transition-all duration-300 shadow-xl shadow-blue-900/30 border border-white/10 flex items-center gap-2"
            onClick={() => {
              call.join();
              setIsSetupComplete(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="m15 10-4 4 6 6V4l-6 6 4 4"></path>
            </svg>
            Join Meeting
          </button>
        </div>
      </div>
    </div>
  );
}

export default MeetingSetup;
