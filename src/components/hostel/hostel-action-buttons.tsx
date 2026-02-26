"use client";

import { Phone, Navigation, Share2 } from "lucide-react";

interface HostelActionButtonsProps {
  hostelName: string;
  location?: string;
  contactNumber?: string;
  googleMapLink?: string;
}

export function HostelActionButtons({ 
  hostelName, 
  location, 
  contactNumber, 
  googleMapLink 
}: HostelActionButtonsProps) {
  const handleContactClick = () => {
    const contactSection = document.querySelector('[data-section="contact"]');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLocationClick = () => {
    if (googleMapLink) {
      window.open(googleMapLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShareClick = async () => {
    const shareData = {
      title: hostelName,
      text: `Check out ${hostelName}${location ? ` in ${location}` : ''}`,
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
    <div className="flex items-center gap-2 mt-3">
      {contactNumber && (
        <button
          onClick={handleContactClick}
          className="flex items-center gap-1.5 rounded-lg border border-brand-primary bg-transparent px-3 py-2 text-xs font-bold text-brand-primary transition-colors hover:bg-brand-primary hover:text-brand-white"
          aria-label="Contact"
        >
          <Phone className="h-3.5 w-3.5" />
          <span>Contact</span>
        </button>
      )}
      
      {googleMapLink && (
        <button
          onClick={handleLocationClick}
          className="flex items-center gap-1.5 rounded-lg border border-brand-primary bg-transparent px-3 py-2 text-xs font-bold text-brand-primary transition-colors hover:bg-brand-primary hover:text-brand-white"
          aria-label="View Location"
        >
          <Navigation className="h-3.5 w-3.5" />
          <span>Location</span>
        </button>
      )}
      
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
