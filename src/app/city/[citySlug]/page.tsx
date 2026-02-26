import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Building2, Users, Award } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HostelCard } from "@/components/shared/hostel-card";
import { WhyChooseCity } from "@/components/city/why-choose-city";
import { CityFAQSection } from "@/components/city/city-faq-section";
import { AreaSection } from "@/components/city/area-section";
import { RelatedLinksSection } from "@/components/city/related-links-section";
import { getCityBySlug, getHostelsByCity, getCitiesWithHostels } from "@/services/city.service";
import { getCityFAQs } from "@/lib/constants/city-faqs";

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

  const isBhopal = city.name.toLowerCase() === 'bhopal';
  const title = isBhopal 
    ? `Best Hostels in Bhopal, MP - ${city.hostelCount}+ Boys & Girls PG | GetStay`
    : `Hostels in ${city.name}, ${city.state} - ${city.hostelCount}+ Options | GetStay`;
  
  const description = isBhopal
    ? `Discover the best hostels and PG accommodations in Bhopal, Madhya Pradesh. ${city.hostelCount}+ verified hostels including ${city.boysHostelCount} boys hostels and ${city.girlsHostelCount} girls hostels. Modern amenities, WiFi, food, safe environment. Book affordable student and working professional accommodation in Bhopal with GetStay.`
    : `Find the best hostels in ${city.name}, ${city.state}. ${city.hostelCount}+ verified hostels with ${city.boysHostelCount} boys hostels and ${city.girlsHostelCount} girls hostels. Book affordable PG accommodation on GetStay.`;

  const keywords = isBhopal ? [
    "hostels in Bhopal",
    "PG in Bhopal",
    "Bhopal hostels",
    "boys hostel Bhopal",
    "girls hostel Bhopal",
    "best hostel in Bhopal",
    "affordable hostel Bhopal",
    "student accommodation Bhopal",
    "PG accommodation Bhopal",
    "hostel near me Bhopal",
    "cheap hostel Bhopal",
    "hostel with WiFi Bhopal",
    "hostel with food Bhopal",
    "working professional hostel Bhopal",
    "Madhya Pradesh hostels",
    "Bhopal MP hostels",
    "hostel booking Bhopal",
    "GetStay Bhopal"
  ] : [
    `hostels in ${city.name}`,
    `PG in ${city.name}`,
    `${city.name} hostels`,
    `boys hostel ${city.name}`,
    `girls hostel ${city.name}`,
    `affordable hostel ${city.name}`,
    `student accommodation ${city.name}`,
    `${city.state} hostels`,
  ];

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: "GetStay" }],
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
      site: "@GetStay",
    },
    alternates: {
      canonical: `https://getstay.com/city/${citySlug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
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
  const faqs = getCityFAQs(city.name);
  const isBhopal = city.name.toLowerCase() === 'bhopal';

  // Group hostels by area for Bhopal
  const areaHostels = isBhopal ? {
    'MP Nagar': hostels.filter(h => h.name.toLowerCase().includes('mp nagar') || h.description?.toLowerCase().includes('mp nagar')),
    'Near MANIT': hostels.filter(h => h.name.toLowerCase().includes('manit') || h.description?.toLowerCase().includes('manit')),
    'Kolar Road': hostels.filter(h => h.name.toLowerCase().includes('kolar') || h.description?.toLowerCase().includes('kolar')),
    'Near Railway Station': hostels.filter(h => h.name.toLowerCase().includes('railway') || h.description?.toLowerCase().includes('railway station')),
    'Near LNCT': hostels.filter(h => h.name.toLowerCase().includes('lnct') || h.description?.toLowerCase().includes('lnct')),
  } : {
    'MP Nagar': [],
    'Near MANIT': [],
    'Kolar Road': [],
    'Near Railway Station': [],
    'Near LNCT': [],
  };

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

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header pageTitle={`${city.name} Hostels`} showBackButton={true} />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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

        {/* Why Choose City Section */}
        <WhyChooseCity cityName={city.name} />

        {/* Area-Based Sections for Bhopal */}
        {isBhopal && (
          <div className="mb-8">
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
              Hostels by <span className="text-brand-primary">Area</span> in Bhopal
            </h2>
            
            {areaHostels['MP Nagar'].length > 0 && (
              <AreaSection
                areaName="MP Nagar"
                description="MP Nagar is the commercial and business hub of Bhopal, offering excellent connectivity, shopping centers, restaurants, and entertainment options. Ideal for working professionals and students who prefer a vibrant urban lifestyle."
                hostels={areaHostels['MP Nagar']}
                citySlug={citySlug}
              />
            )}

            {areaHostels['Near MANIT'].length > 0 && (
              <AreaSection
                areaName="Near MANIT"
                description="Perfect for MANIT (Maulana Azad National Institute of Technology) students, these hostels offer easy access to the campus with good connectivity to other parts of the city. The area has essential facilities like shops, medical stores, and eateries."
                hostels={areaHostels['Near MANIT']}
                citySlug={citySlug}
              />
            )}

            {areaHostels['Kolar Road'].length > 0 && (
              <AreaSection
                areaName="Kolar Road"
                description="Kolar Road is known for affordable hostel options with good transport connectivity. The area has a mix of residential and commercial establishments, making it convenient for daily needs. Popular among students and budget-conscious individuals."
                hostels={areaHostels['Kolar Road']}
                citySlug={citySlug}
              />
            )}

            {areaHostels['Near Railway Station'].length > 0 && (
              <AreaSection
                areaName="Near Railway Station"
                description="Hostels near Bhopal Railway Station offer excellent connectivity for students and professionals who travel frequently. The area is well-connected to all parts of the city via local transport and has good availability of essential services."
                hostels={areaHostels['Near Railway Station']}
                citySlug={citySlug}
              />
            )}

            {areaHostels['Near LNCT'].length > 0 && (
              <AreaSection
                areaName="Near LNCT"
                description="Located near LNCT (Lakshmi Narain College of Technology), these hostels are popular among engineering students. The area offers a peaceful environment conducive to studies with easy access to the college campus and basic amenities."
                hostels={areaHostels['Near LNCT']}
                citySlug={citySlug}
              />
            )}
          </div>
        )}

        {/* FAQ Section */}
        <CityFAQSection cityName={city.name} faqs={faqs} />

        {/* Related Links Section */}
        <RelatedLinksSection 
          cityName={city.name} 
          citySlug={citySlug}
          state={city.state}
        />

        {/* SEO Content */}
        <Card className="rounded-xl border border-border">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              About Hostels in <span className="text-brand-primary">{city.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p className="text-sm font-light leading-relaxed text-muted-foreground mb-3">
              Looking for quality hostel accommodation in {city.name}, {city.state}? GetStay offers {city.hostelCount}+ verified hostels 
              and PG options to choose from. Whether you're a student, working professional, or someone looking for affordable 
              accommodation, we have the perfect place for you.
            </p>
            <p className="text-sm font-light leading-relaxed text-muted-foreground">
              Our listings include {city.boysHostelCount} boys hostels and {city.girlsHostelCount} girls hostels, all verified 
              and equipped with modern amenities like WiFi, food, security, and more. Find hostels near your college, workplace, 
              or preferred location in {city.name}. Book with confidence on GetStay - your trusted hostel booking platform.
            </p>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}
