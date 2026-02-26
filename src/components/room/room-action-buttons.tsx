"use client";

import Link from "next/link";
import { Building2, Share2 } from "lucide-react";

interface RoomActionButtonsProps {
  roomName: string;
  hostelName: string;
  hostelSlug: string;
}

export function RoomActionButtons({ 
  roomName, 
  hostelName, 
  hostelSlug 
}: RoomActionButtonsProps) {
  const handleShareClick = async () => {
    const shareData = {
      title: roomName,
      text: `Check out ${roomName} at ${hostelName}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link href={`/hostel/${hostelSlug}`}>
        <button
          className="flex items-center gap-1.5 rounded-lg border border-brand-primary bg-transparent px-3 py-2 text-xs font-bold text-brand-primary transition-colors hover:bg-brand-primary hover:text-brand-white"
          aria-label="View Hostel"
        >
          <Building2 className="h-3.5 w-3.5" />
          <span>View Hostel</span>
        </button>
      </Link>
      
      <button
        onClick={handleShareClick}
        className="flex items-center gap-1.5 rounded-lg border border-brand-primary bg-transparent px-3 py-2 text-xs font-bold text-brand-primary transition-colors hover:bg-brand-primary hover:text-brand-white"
        aria-label="Share"
      >
        <Share2 className="h-3.5 w-3.5" />
        <span>Share</span>
      </button>
    </div>
  );
}
