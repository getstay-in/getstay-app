"use client";

import { useEffect, useState } from "react";
import { Building2, MapPin, Users, Home, Sparkles } from "lucide-react";

interface AnimatedBannerProps {
  hostelName: string;
  location?: string;
  totalRooms?: number;
  accommodationType?: string;
}

export function AnimatedBanner({ hostelName, location, totalRooms, accommodationType }: AnimatedBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    {
      icon: Home,
      text: hostelName,
      color: "from-brand-primary to-brand-primary-light",
    },
    {
      icon: MapPin,
      text: location || "Prime Location",
      color: "from-brand-primary-light to-brand-primary",
    },
    {
      icon: Building2,
      text: totalRooms ? `${totalRooms}+ Rooms` : "Spacious Rooms",
      color: "from-brand-primary to-brand-primary-light",
    },
    {
      icon: Users,
      text: accommodationType === "boys" ? "Boys Hostel" : accommodationType === "girls" ? "Girls Hostel" : "Co-ed Hostel",
      color: "from-brand-primary-light to-brand-primary",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [items.length]);

  const Icon = items[currentIndex].icon;

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-brand-primary via-brand-primary to-brand-primary-light">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-brand-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-white rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        <Sparkles className="absolute top-4 right-4 h-4 w-4 text-brand-white/30 animate-pulse" />
        <Sparkles className="absolute bottom-6 left-6 h-3 w-3 text-brand-white/20 animate-pulse delay-500" />
        <Sparkles className="absolute top-1/2 right-8 h-3 w-3 text-brand-white/25 animate-pulse delay-700" />
      </div>

      <div className="relative flex h-full flex-col items-center justify-center p-6 text-brand-white">
        {/* Icon with animated ring */}
        <div className="relative mb-4">
          <div className="absolute inset-0 rounded-full bg-brand-white/20 animate-ping" />
          <div
            key={`icon-${currentIndex}`}
            className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-white/10 backdrop-blur-sm border border-brand-white/30 animate-in zoom-in-50 duration-500"
          >
            <Icon className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text with slide animation */}
        <div
          key={`text-${currentIndex}`}
          className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <p className="text-base font-bold sm:text-lg lg:text-xl tracking-wide">
            {items[currentIndex].text}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 mt-6">
          {items.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-8 bg-brand-white"
                  : "w-1.5 bg-brand-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
