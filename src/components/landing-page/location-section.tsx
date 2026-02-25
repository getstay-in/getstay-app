import { MapPin } from "lucide-react";
import Link from "next/link";

const bhopalAreas = [
  "Arera Colony",
  "MP Nagar",
  "Kolar Road",
  "Hoshangabad Road",
  "Ayodhya Bypass",
  "Bairagarh",
  "Berasia Road",
  "Govindpura",
];

export function LocationSection() { 
  return (
    <section className="bg-background py-12">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="overflow-hidden rounded-2xl border border-border bg-muted/30 p-8">
          {/* Header */}
          <div className="mb-6 flex items-center gap-3">
            <MapPin className="h-6 w-6 text-brand-primary" />
            <div>
              <p className="text-xs font-light uppercase tracking-wide text-muted-foreground">
                Currently Operating In
              </p>
              <Link href="/city/bhopal">
                <h3 className="text-2xl font-bold text-foreground transition-colors hover:text-brand-primary">
                  Bhopal, Madhya Pradesh
                </h3>
              </Link>
            </div>
          </div>

          {/* Areas */}
          <div className="flex flex-wrap gap-2">
            {bhopalAreas.map((area, index) => (
              <span
                key={index}
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-light text-foreground transition-colors hover:border-brand-primary/50"
              >
                {area}
              </span>
            ))}
          </div>

          {/* Footer note */}
          <p className="mt-6 text-xs font-light text-muted-foreground">
            Expanding to more cities soon
          </p>
        </div>
      </div>
    </section>
  );
}
