import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Building2, Users, Award } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HostelCard } from "@/components/shared/hostel-card";
import { getCityBySlug, getHostelsByCity, getCitiesWithHostels } from "@/services/city.service";

interface CityPageProps {
  params: Promise<{
    citySlug: string;
  }>;
}

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export async function generateStaticParams() {
  const cities = await getCitiesWithHostels();
  
  return cities.map((city) => ({
    citySlug: city.slug,
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { citySlug } = await params;
  const city = await getCityBySlug(citySlug);

  if (!city) {
    return {
      title: "City Not Found",
    };
  }

  const title = `Hostels in ${city.name}, ${city.state} - ${city.hostelCount}+ Options | GetStay`;
  const description = `Find the best hostels in ${city.name}, ${city.state}. ${city.hostelCount}+ verified hostels with ${city.boysHostelCount} boys hostels and ${city.girlsHostelCount} girls hostels. Book affordable PG accommodation on GetStay.`;

  return {
    title,
    description,
    keywords: [
      `hostels in ${city.name}`,
      `PG in ${city.name}`,
      `${city.name} hostels`,
      `boys hostel ${city.name}`,
      `girls hostel ${city.name}`,
      `affordable hostel ${city.name}`,
      `student accommodation ${city.name}`,
      `${city.state} hostels`,
    ].join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://getstay.com/city/${citySlug}`,
      siteName: 'GetStay',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://getstay.com/city/${citySlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { citySlug } = await params;
  const city = await getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  const hostels = await getHostelsByCity(citySlug, undefined, 50);

  // JSON-LD Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Hostels in ${city.name}, ${city.state}`,
    description: `List of hostels and PG accommodations in ${city.name}`,
    numberOfItems: hostels.length,
    itemListElement: hostels.slice(0, 10).map((hostel, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'LodgingBusiness',
        name: hostel.name,
        url: `https://getstay.com/hostel/${hostel.slug}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: hostel.city,
          addressRegion: hostel.state,
          addressCountry: 'IN',
        },
      },
    })),
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://getstay.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${city.name} Hostels`,
        item: `https://getstay.com/city/${citySlug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li>/</li>
            <li className="text-foreground" aria-current="page">{city.name} Hostels</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="mb-3 text-4xl font-bold sm:text-5xl">
            Hostels in <span className="text-brand-primary">{city.name}</span>
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span className="text-lg">{city.state}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Building2 className="h-8 w-8 text-brand-primary" />
              <div>
                <p className="text-2xl font-bold">{city.hostelCount}+</p>
                <p className="text-sm text-muted-foreground">Total Hostels</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{city.boysHostelCount}</p>
                <p className="text-sm text-muted-foreground">Boys Hostels</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Users className="h-8 w-8 text-pink-500" />
              <div>
                <p className="text-2xl font-bold">{city.girlsHostelCount}</p>
                <p className="text-sm text-muted-foreground">Girls Hostels</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Award className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">Verified</p>
                <p className="text-sm text-muted-foreground">All Listings</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Links */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Browse by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {city.girlsHostelCount >= 3 && (
                <Link href={`/city/${citySlug}/girls-hostel`}>
                  <Card className="transition-all hover:border-brand-primary/50 hover:shadow-sm">
                    <CardContent className="p-4">
                      <h3 className="mb-1 font-semibold">Girls Hostels</h3>
                      <p className="text-sm text-muted-foreground">{city.girlsHostelCount} options</p>
                    </CardContent>
                  </Card>
                </Link>
              )}
              {city.boysHostelCount >= 3 && (
                <Link href={`/city/${citySlug}/boys-hostel`}>
                  <Card className="transition-all hover:border-brand-primary/50 hover:shadow-sm">
                    <CardContent className="p-4">
                      <h3 className="mb-1 font-semibold">Boys Hostels</h3>
                      <p className="text-sm text-muted-foreground">{city.boysHostelCount} options</p>
                    </CardContent>
                  </Card>
                </Link>
              )}
              <Link href={`/city/${citySlug}/affordable`}>
                <Card className="transition-all hover:border-brand-primary/50 hover:shadow-sm">
                  <CardContent className="p-4">
                    <h3 className="mb-1 font-semibold">Affordable Hostels</h3>
                    <p className="text-sm text-muted-foreground">Budget-friendly</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href={`/city/${citySlug}/best`}>
                <Card className="transition-all hover:border-brand-primary/50 hover:shadow-sm">
                  <CardContent className="p-4">
                    <h3 className="mb-1 font-semibold">Best Hostels</h3>
                    <p className="text-sm text-muted-foreground">Top rated</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Hostels Grid */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">All Hostels in {city.name}</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {hostels.map((hostel) => (
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
        </div>

        {/* SEO Content */}
        <Card>
          <CardHeader>
            <CardTitle>About Hostels in {city.name}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Looking for quality hostel accommodation in {city.name}, {city.state}? GetStay offers {city.hostelCount}+ verified hostels 
              and PG options to choose from. Whether you're a student, working professional, or someone looking for affordable 
              accommodation, we have the perfect place for you.
            </p>
            <p>
              Our listings include {city.boysHostelCount} boys hostels and {city.girlsHostelCount} girls hostels, all verified 
              and equipped with modern amenities. Find hostels near your college, workplace, or preferred location in {city.name}.
            </p>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}
