"use client";

import { useEffect, useState } from "react";
import { Building2, MapPin, Users, Home } from "lucide-react";

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
    },
    {
      icon: MapPin,
      text: location || "Prime Location",
    },
    {
      icon: Building2,
      text: totalRooms ? `${totalRooms}+ Rooms` : "Spacious Rooms",
    },
    {
      icon: Users,
      text: accommodationType === "boys" ? "Boys Hostel" : accommodationType === "girls" ? "Girls Hostel" : "Co-ed Hostel",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [items.length]);

  const Icon = items[currentIndex].icon;

  return (
    <div className="relative h-full w-full overflow-hidden bg-brand-primary">
      <div className="flex h-full flex-col items-center justify-center p-6 text-brand-white">
        <div
          key={currentIndex}
          className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-700"
        >
          <Icon className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={1.5} />
          <p className="text-center text-base font-medium sm:text-lg">
            {items[currentIndex].text}
          </p>
        </div>
      </div>

   
    </div>
  );
}
