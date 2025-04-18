'use client';
import React, { useState, useEffect } from "react";

const ClockDisplay: React.FC = () => {
  // State for current time and date
  const [currentTime, setCurrentTime] = useState(new Date());

  // Effect to update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up timer on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format date
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Format time as HH:MM AM/PM
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

  return (
    <div className="relative bg-hero bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden mb-6">
      <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}
      <div className="relative z-10 p-6 md:p-8">
        {/* Upcoming meeting badge */}
        <div className="inline-block bg-gray-800/70 text-white text-sm px-3 py-1.5 rounded-md mb-6">
          Upcoming Meeting at: 12:30 PM
        </div>

        {/* Large time display */}
        <div className="text-white">
          <h1 className="text-5xl md:text-6xl font-bold">{formattedTime}</h1>
          <p className="text-lg md:text-xl mt-1">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ClockDisplay;
