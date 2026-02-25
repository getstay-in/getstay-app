import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";

interface City {
  slug: string;
  name: string;
  state: string;
  hostelCount: number;
}

interface CitiesSectionProps {
  cities: City[];
}

export function CitiesSection({ cities }: CitiesSectionProps) {
  if (cities.length === 0) return null;

  return (
    <section className="bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-8">
          <h2 className="mb-2 text-4xl font-light">
            Browse by <span className="font-bold text-brand-primary">City</span>
          </h2>
          <p className="text-sm font-light text-muted-foreground">
            Explore hostels in cities across India
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/city/${city.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-background p-5 transition-all hover:border-brand-primary/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted transition-colors group-hover:border-brand-primary/50">
                    <MapPin className="h-5 w-5 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-brand-primary">
                      {city.name}
                    </h3>
                    <p className="text-xs font-light text-muted-foreground">
                      {city.state}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    {city.hostelCount}+ hostels
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
