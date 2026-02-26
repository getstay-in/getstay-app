import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, IndianRupee, Building2, Search } from "lucide-react";

interface RelatedLinksSectionProps {
  cityName: string;
  citySlug: string;
  state?: string;
}

export function RelatedLinksSection({ cityName, citySlug, state }: RelatedLinksSectionProps) {
  const isBhopal = cityName.toLowerCase() === 'bhopal';

  // Popular searches for Bhopal
  const bhopalSearches = [
    { text: "Boys Hostel in Bhopal", href: `/city/${citySlug}/boys-hostel` },
    { text: "Girls Hostel in Bhopal", href: `/city/${citySlug}/girls-hostel` },
    { text: "PG in Bhopal", href: `/city/${citySlug}` },
    { text: "Hostel Near MANIT Bhopal", href: `/city/${citySlug}#near-manit` },
    { text: "Hostel in MP Nagar Bhopal", href: `/city/${citySlug}#mp-nagar` },
    { text: "Affordable Hostel in Bhopal", href: `/city/${citySlug}/affordable` },
    { text: "Best Hostel in Bhopal", href: `/city/${citySlug}/best` },
    { text: "Hostel Near LNCT Bhopal", href: `/city/${citySlug}#near-lnct` },
    { text: "Hostel in Kolar Road Bhopal", href: `/city/${citySlug}#kolar-road` },
    { text: "Student Hostel in Bhopal", href: `/city/${citySlug}` },
    { text: "Working Professional PG Bhopal", href: `/city/${citySlug}` },
    { text: "Hostel with Food in Bhopal", href: `/city/${citySlug}` },
    { text: "AC Hostel in Bhopal", href: `/city/${citySlug}` },
    { text: "Hostel Near Railway Station Bhopal", href: `/city/${citySlug}#near-railway-station` },
    { text: "Safe Girls Hostel Bhopal", href: `/city/${citySlug}/girls-hostel` },
    { text: "Cheap Hostel in Bhopal", href: `/city/${citySlug}/affordable` },
  ];

  // Generic searches for other cities
  const genericSearches = [
    { text: `Boys Hostel in ${cityName}`, href: `/city/${citySlug}/boys-hostel` },
    { text: `Girls Hostel in ${cityName}`, href: `/city/${citySlug}/girls-hostel` },
    { text: `PG in ${cityName}`, href: `/city/${citySlug}` },
    { text: `Affordable Hostel in ${cityName}`, href: `/city/${citySlug}/affordable` },
    { text: `Best Hostel in ${cityName}`, href: `/city/${citySlug}/best` },
    { text: `Student Hostel in ${cityName}`, href: `/city/${citySlug}` },
  ];

  const popularSearches = isBhopal ? bhopalSearches : genericSearches;

  // Nearby cities (you can make this dynamic based on actual data)
  const nearbyCities = isBhopal ? [
    { name: "Indore", slug: "indore" },
    { name: "Jabalpur", slug: "jabalpur" },
    { name: "Gwalior", slug: "gwalior" },
    { name: "Ujjain", slug: "ujjain" },
  ] : [];

  // Price ranges
  const priceRanges = [
    { text: "Under ₹5,000", href: `/city/${citySlug}?price=under-5000` },
    { text: "₹5,000 - ₹6,000", href: `/city/${citySlug}?price=5000-6000` },
    { text: "₹6,000 - ₹8,000", href: `/city/${citySlug}?price=6000-8000` },
    { text: "Above ₹8,000", href: `/city/${citySlug}?price=above-8000` },
  ];

  // Amenities
  const amenities = [
    { text: "WiFi Hostels", href: `/city/${citySlug}?amenity=wifi` },
    { text: "AC Hostels", href: `/city/${citySlug}?amenity=ac` },
    { text: "Food Included", href: `/city/${citySlug}?amenity=food` },
    { text: "Laundry Service", href: `/city/${citySlug}?amenity=laundry` },
  ];

  return (
    <section className="mb-8">
      <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
        Related <span className="text-brand-primary">Searches</span>
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Popular Searches */}
        <Card className="rounded-xl border border-border hover:border-brand-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <Search className="h-5 w-5 text-brand-primary" />
              Popular Searches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <Link
                  key={index}
                  href={search.href}
                  className="inline-block rounded-full border border-border bg-background px-3 py-1.5 text-xs font-bold text-foreground transition-all hover:border-brand-primary hover:bg-brand-primary/5 hover:text-brand-primary"
                >
                  {search.text}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Browse by Price */}
        <Card className="rounded-xl border border-border hover:border-brand-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <IndianRupee className="h-5 w-5 text-brand-primary" />
              Browse by Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {priceRanges.map((range, index) => (
                <Link
                  key={index}
                  href={range.href}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-bold transition-all hover:border-brand-primary hover:bg-brand-primary/5"
                >
                  <span>{range.text}</span>
                  <span className="text-xs text-muted-foreground">→</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Browse by Amenities */}
        <Card className="rounded-xl border border-border hover:border-brand-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <Building2 className="h-5 w-5 text-brand-primary" />
              Browse by Amenities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {amenities.map((amenity, index) => (
                <Link
                  key={index}
                  href={amenity.href}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-center text-xs font-bold transition-all hover:border-brand-primary hover:bg-brand-primary/5 hover:text-brand-primary"
                >
                  {amenity.text}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Browse by Gender */}
        <Card className="rounded-xl border border-border hover:border-brand-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <Users className="h-5 w-5 text-brand-primary" />
              Browse by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link
                href={`/city/${citySlug}/boys-hostel`}
                className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-bold transition-all hover:border-brand-primary hover:bg-brand-primary/5"
              >
                <span>Boys Hostels</span>
                <span className="text-xs text-muted-foreground">→</span>
              </Link>
              <Link
                href={`/city/${citySlug}/girls-hostel`}
                className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-bold transition-all hover:border-brand-primary hover:bg-brand-primary/5"
              >
                <span>Girls Hostels</span>
                <span className="text-xs text-muted-foreground">→</span>
              </Link>
              <Link
                href={`/city/${citySlug}/affordable`}
                className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-bold transition-all hover:border-brand-primary hover:bg-brand-primary/5"
              >
                <span>Affordable Hostels</span>
                <span className="text-xs text-muted-foreground">→</span>
              </Link>
              <Link
                href={`/city/${citySlug}/best`}
                className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-bold transition-all hover:border-brand-primary hover:bg-brand-primary/5"
              >
                <span>Best Rated Hostels</span>
                <span className="text-xs text-muted-foreground">→</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nearby Cities */}
      {nearbyCities.length > 0 && (
        <Card className="mt-6 rounded-xl border border-border hover:border-brand-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <MapPin className="h-5 w-5 text-brand-primary" />
              Hostels in Nearby Cities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {nearbyCities.map((city, index) => (
                <Link
                  key={index}
                  href={`/city/${city.slug}`}
                  className="inline-block rounded-full border border-border bg-background px-4 py-2 text-sm font-bold text-foreground transition-all hover:border-brand-primary hover:bg-brand-primary/5 hover:text-brand-primary"
                >
                  Hostels in {city.name}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* SEO Text Links */}
      <div className="mt-6 rounded-xl border border-border bg-muted/30 p-6">
        <h3 className="mb-4 text-base font-bold">
          Quick Links for Hostels in {cityName}
        </h3>
        <div className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <Link href={`/city/${citySlug}`} className="font-light text-muted-foreground hover:text-brand-primary transition-colors">
            • All Hostels in {cityName}
          </Link>
          <Link href={`/city/${citySlug}/boys-hostel`} className="font-light text-muted-foreground hover:text-brand-primary transition-colors">
            • Boys Hostel {cityName}
          </Link>
          <Link href={`/city/${citySlug}/girls-hostel`} className="font-light text-muted-foreground hover:text-brand-primary transition-colors">
            • Girls Hostel {cityName}
          </Link>
          <Link href={`/city/${citySlug}/affordable`} className="font-light text-muted-foreground hover:text-brand-primary transition-colors">
            • Cheap Hostel {cityName}
          </Link>
          <Link href={`/city/${citySlug}/best`} className="font-light text-muted-foreground hover:text-brand-primary transition-colors">
            • Best Hostel {cityName}
          </Link>
          <Link href={`/city/${citySlug}`} className="font-light text-muted-foreground hover:text-brand-primary transition-colors">
            • PG in {cityName}
          </Link>
          {isBhopal && (
            <>
              <Link href={`/city/${citySlug}#mp-nagar`} className="font-light text-muted-foreground hover:text-brand-primary transition-colors">
                • Hostel in MP Nagar
              </Link>
              <Link href={`/city/${citySlug}#near-manit`} className="font-light text-muted-foreground hover:text-brand-primary transition-colors">
                • Hostel Near MANIT
              </Link>
              <Link href={`/city/${citySlug}#kolar-road`} className="font-light text-muted-foreground hover:text-brand-primary transition-colors">
                • Hostel in Kolar Road
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
