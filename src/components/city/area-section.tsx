import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { HostelCard } from "@/components/shared/hostel-card";

interface Hostel {
  _id: string;
  slug: string;
  name: string;
  description?: string;
  city: string;
  state: string;
  totalRooms?: number;
  accommodationType?: 'boys' | 'girls' | 'coed' | 'separate';
  mainPhoto?: string;
}

interface AreaSectionProps {
  areaName: string;
  description: string;
  hostels: Hostel[];
  citySlug: string;
}

export function AreaSection({ areaName, description, hostels, citySlug }: AreaSectionProps) {
  if (hostels.length === 0) return null;

  return (
    <section id={areaName.toLowerCase().replace(/\s+/g, '-')} className="mb-8 scroll-mt-20">
      <div className="mb-4">
        <h3 className="mb-2 text-xl font-bold sm:text-2xl flex items-center gap-2">
          <MapPin className="h-5 w-5 text-brand-primary" />
          Hostels in {areaName}
        </h3>
        <p className="text-sm font-light text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hostels.slice(0, 3).map((hostel) => (
          <HostelCard
            key={hostel._id}
            slug={hostel.slug}
            name={hostel.name}
            subtitle={hostel.description}
            city={hostel.city}
            state={hostel.state}
            totalRooms={hostel.totalRooms || 0}
            accommodationType={hostel.accommodationType || 'boys'}
            mainPhoto={hostel.mainPhoto}
          />
        ))}
      </div>

      {hostels.length > 3 && (
        <div className="mt-4 text-center">
          <Link 
            href={`/city/${citySlug}#${areaName.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-primary/80 transition-colors"
          >
            View all hostels in {areaName}
          </Link>
        </div>
      )}
    </section>
  );
}
