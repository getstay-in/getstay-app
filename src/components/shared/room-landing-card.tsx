import Image from "next/image";
import Link from "next/link";
import { IndianRupee, Package, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RoomLandingCardProps {
  roomId: string;
  name: string;
  description: string;
  rent: number;
  coverImage?: string;
  components: Array<{
    name: string;
    description: string;
  }>;
  hostelName: string;
  hostelCity?: string;
  hostelState?: string;
}

export function RoomLandingCard({
  roomId,
  name,
  description,
  rent,
  coverImage,
  components,
  hostelName,
  hostelCity,
  hostelState,
}: RoomLandingCardProps) {
  const location = hostelCity && hostelState 
    ? `${hostelCity}, ${hostelState}`
    : hostelCity || hostelState || '';

  return (
    <Link href={`/room/${roomId}`} className="block">
      <Card className="group overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-brand-primary/50 hover:shadow-sm">
        {/* Image section */}
        <div className="relative h-48 overflow-hidden bg-muted">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background/30 backdrop-blur-sm">
                  <svg className="h-10 w-10 text-foreground/20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </div>
              </div>
            </>
          )}
          
          {/* Price badge */}
          <Badge
            className="absolute bottom-3 right-3 rounded-lg bg-background/95 px-3 py-1.5 text-sm font-bold backdrop-blur-sm"
            variant="secondary"
          >
            <IndianRupee className="mr-1 inline h-3.5 w-3.5" />
            {rent.toLocaleString('en-IN')}/mo
          </Badge>
        </div>
        
        {/* Card content */}
        <CardContent className="p-4">
          <h3 className="mb-1 truncate text-base font-bold text-foreground">
            {name}
          </h3>
          <p className="mb-2 truncate text-xs font-light text-muted-foreground">
            {hostelName}
          </p>
          {location && (
            <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{location}</span>
            </div>
          )}
          
          {/* Components */}
          {components.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {components.slice(0, 3).map((component, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs font-normal"
                >
                  {component.name}
                </Badge>
              ))}
              {components.length > 3 && (
                <Badge variant="outline" className="text-xs font-normal">
                  +{components.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
