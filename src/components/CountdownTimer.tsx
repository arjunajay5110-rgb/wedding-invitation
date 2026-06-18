"use client";

import React, { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

interface CountdownTimerProps {
  targetDate: string;
  lang?: "en" | "ml";
}

const translations = {
  en: {
    live: "The Wedding Celebration is Live!",
    days: "Days",
    hours: "Hours",
    mins: "Minutes",
    secs: "Seconds",
  },
  ml: {
    live: "വിവാഹ ചടങ്ങുകൾ ആരംഭിച്ചു!",
    days: "ദിവസം",
    hours: "മണിക്കൂർ",
    mins: "മിനിറ്റ്",
    secs: "സെക്കൻഡ്",
  }
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  lang = "en",
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const t = translations[lang];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeftData: TimeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
      };

      if (difference > 0) {
        timeLeftData = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isExpired: false,
        };
      }

      setTimeLeft(timeLeftData);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return (
      <div className="text-center py-3 px-6 bg-[#1E3F20]/5 backdrop-blur-sm rounded-xl border border-[#C5A059]/40 shadow-sm max-w-sm mx-auto">
        <p className="font-serif text-base font-bold text-[#1E3F20] tracking-wide uppercase">
          {t.live}
        </p>
      </div>
    );
  }

  const timerItems = [
    { label: t.days, value: timeLeft.days },
    { label: t.hours, value: timeLeft.hours },
    { label: t.mins, value: timeLeft.minutes },
    { label: t.secs, value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center items-center gap-3.5 md:gap-5 w-full max-w-md mx-auto py-2">
      {timerItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center bg-white/70 border-2 border-[#C5A059] rounded-xl p-3 w-20 md:w-24 shadow-md shadow-[#1E3F20]/5 relative overflow-hidden"
        >
          {/* Accent Gold top bar */}
          <div className="absolute top-0 left-0 w-full h-[4px] bg-[#C5A059]" />

          {/* Numbers: Bigger size, slightly bolder weight, maximum contrast */}
          <span className="font-serif text-3xl md:text-4xl font-black text-[#1E3F20] leading-none mb-1">
            {String(item.value).padStart(2, "0")}
          </span>

          {/* Labels: Clearly visible, high-contrast text */}
          <span className="text-[10px] md:text-xs font-extrabold text-[#C5A059] tracking-wider uppercase">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
export default CountdownTimer;
