import Image from "next/image";
import Link from "next/link";
import { IndianRupee, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CompactRoomCardProps {
  roomId: string;
  name: string;
  description: string;
  rent: number;
  coverImage?: string;
  components: Array<{
    name: string;
    description: string;
  }>;
}

export function CompactRoomCard({
  roomId,
  name,
  description,
  rent,
  coverImage,
  components,
}: CompactRoomCardProps) {
  return (
    <Link href={`/room/${roomId}`} className="block">
      <div className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-brand-primary/50 hover:shadow-md">
        {/* Image section - reduced height */}
        <div className="relative h-52 overflow-hidden bg-muted sm:h-36">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/30 backdrop-blur-sm">
                  <svg className="h-8 w-8 text-foreground/20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </div>
              </div>
            </>
          )}
          
          {/* Price badge */}
          <Badge
            className="absolute bottom-2 right-2 rounded-lg bg-brand-primary px-2.5 py-1 text-xs font-bold text-brand-white backdrop-blur-sm dark:bg-brand-primary-light dark:text-brand-dark"
            variant="secondary"
          >
            <IndianRupee className="mr-0.5 inline h-3 w-3" />
            {rent.toLocaleString('en-IN')}/mo
          </Badge>
        </div>
        
        {/* Card content - reduced padding */}
        <div className="p-3 sm:p-4">
          <h3 className="mb-1.5 text-base font-bold text-foreground sm:text-lg">
            {name}
          </h3>
          <p className="mb-2.5 line-clamp-1 text-xs text-muted-foreground sm:text-sm">
            {description}
          </p>
          
          {/* Components */}
          {components.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Package className="h-3 w-3" />
                <span>Includes:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {components.slice(0, 3).map((component, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-[10px] font-normal sm:text-xs"
                  >
                    {component.name}
                  </Badge>
                ))}
                {components.length > 3 && (
                  <Badge variant="outline" className="text-[10px] font-normal sm:text-xs">
                    +{components.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
