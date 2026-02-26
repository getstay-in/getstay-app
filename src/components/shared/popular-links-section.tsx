import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Search, TrendingUp } from "lucide-react";

export function PopularLinksSection() {
  const popularCities = [
    { name: "Bhopal", slug: "bhopal" },
    { name: "Indore", slug: "indore" },
    { name: "Delhi", slug: "delhi" },
    { name: "Mumbai", slug: "mumbai" },
    { name: "Bangalore", slug: "bangalore" },
    { name: "Pune", slug: "pune" },
    { name: "Hyderabad", slug: "hyderabad" },
    { name: "Chennai", slug: "chennai" },
  ];

  const popularSearches = [
    { text: "Boys Hostel", href: "/search?q=boys+hostel" },
    { text: "Girls Hostel", href: "/search?q=girls+hostel" },
    { text: "PG Accommodation", href: "/search?q=pg" },
    { text: "Affordable Hostel", href: "/search?q=affordable+hostel" },
    { text: "Student Hostel", href: "/search?q=student+hostel" },
    { text: "Working Professional PG", href: "/search?q=working+professional" },
    { text: "Hostel with Food", href: "/search?q=hostel+with+food" },
    { text: "AC Hostel", href: "/search?q=ac+hostel" },
    { text: "WiFi Hostel", href: "/search?q=wifi+hostel" },
    { text: "Single Room", href: "/search?q=single+room" },
    { text: "2 Sharing", href: "/search?q=2+sharing" },
    { text: "3 Sharing", href: "/search?q=3+sharing" },
  ];

  const trendingSearches = [
    "Hostel in Bhopal",
    "PG in Bhopal",
    "Boys Hostel Bhopal",
    "Girls Hostel Bhopal",
    "Hostel Near MANIT",
    "Affordable Hostel Bhopal",
  ];

  return (
    <section className="mb-8">
      <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
        Popular <span className="text-brand-primary">Searches</span>
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Popular Cities */}
        <Card className="rounded-xl border border-border hover:border-brand-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <MapPin className="h-5 w-5 text-brand-primary" />
              Browse by City
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {popularCities.map((city, index) => (
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
      </div>

      {/* Trending in Bhopal */}
      <Card className="mt-6 rounded-xl border border-border hover:border-brand-primary/50 transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-bold">
            <TrendingUp className="h-5 w-5 text-brand-primary" />
            Trending in Bhopal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((search, index) => (
              <Link
                key={index}
                href={`/search?q=${encodeURIComponent(search)}`}
                className="inline-block rounded-full border border-brand-primary/30 bg-brand-primary/5 px-4 py-2 text-sm font-bold text-brand-primary transition-all hover:border-brand-primary hover:bg-brand-primary/10"
              >
                {search}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO Text Links */}
      <div className="mt-6 rounded-xl border border-border bg-muted/30 p-6">
        <h3 className="mb-4 text-base font-bold">
          Quick Links
        </h3>
        <div className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/city/bhopal" className="font-light text-muted-foreground hover:text-brand-primary transition-colors">
            • Hostels in Bhopal
          </Link>
          <Link href="/city/bhopal/boys-hostel" className="font-light text-muted-foreground hover:text-brand-primary transition-colors">
            • Boys Hostel Bhopal
          </Link>
          <Link href="/city/bhopal/girls-hostel" className="font-light text-muted-foreground hover:text-brand-primary transition-colors">
            • Girls Hostel Bhopal
          </Link>
          <Link href="/city/indore" className="font-light text-muted-foreground hover:text-brand-primary transition-colors">
            • Hostels in Indore
          </Link>
          <Link href="/city/delhi" className="font-light text-muted-foreground hover:text-brand-primary transition-colors">
            • Hostels in Delhi
          </Link>
          <Link href="/city/mumbai" className="font-light text-muted-foreground hover:text-brand-primary transition-colors">
            • Hostels in Mumbai
          </Link>
          <Link href="/city/bangalore" className="font-light text-muted-foreground hover:text-brand-primary transition-colors">
            • Hostels in Bangalore
          </Link>
          <Link href="/city/pune" className="font-light text-muted-foreground hover:text-brand-primary transition-colors">
            • Hostels in Pune
          </Link>
        </div>
      </div>
    </section>
  );
}
