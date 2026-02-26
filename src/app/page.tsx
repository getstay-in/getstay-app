import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PromoBanner } from "@/components/landing-page/promo-banner";
import { HostelsSection } from "@/components/landing-page/hostels-section";
import { RoomsSection } from "@/components/landing-page/rooms-section";
import { WhyChooseSection } from "@/components/landing-page/why-choose-section";
import { CitiesSection } from "@/components/landing-page/cities-section";
import { LocationSection } from "@/components/landing-page/location-section";
import { PopularLinksSection } from "@/components/shared/popular-links-section";
import { getHostels } from "@/services/hostel.service";
import { getRoomsForLanding } from "@/services/room-landing.service";
import { getCitiesWithHostels } from "@/services/city.service";

export const metadata: Metadata = {
  title: "GetStay - Best Hostels in Bhopal | Boys & Girls PG Accommodation",
  description: "Find the best hostels and PG accommodations in Bhopal with GetStay. Modern amenities, safe environment, affordable prices. Boys hostel, girls hostel, and co-ed options available. Book now and get 20% off with code GETSTAY20.",
  keywords: [
    "hostels in Bhopal",
    "PG in Bhopal",
    "boys hostel Bhopal",
    "girls hostel Bhopal",
    "student accommodation Bhopal",
    "affordable hostel Bhopal",
    "hostel booking Bhopal",
    "PG accommodation Bhopal",
    "hostel near me Bhopal",
    "best hostel Bhopal",
    "cheap hostel Bhopal",
    "hostel with WiFi Bhopal",
    "hostel with food Bhopal",
    "working professional hostel Bhopal",
    "GetStay Bhopal"
  ],
  authors: [{ name: "GetStay" }],
  openGraph: {
    title: "GetStay - Best Hostels in Bhopal | Boys & Girls PG Accommodation",
    description: "Find the best hostels and PG accommodations in Bhopal. Modern amenities, safe environment, affordable prices. Book now and get 20% off!",
    images: [{ url: "/banners/BANNER1.png", width: 1200, height: 630, alt: "GetStay - Hostel Booking in Bhopal" }],
    type: "website",
    url: "https://getstay.com",
    siteName: "GetStay",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetStay - Best Hostels in Bhopal",
    description: "Find the best hostels and PG accommodations in Bhopal. Book now and get 20% off!",
    images: ["/banners/BANNER1.png"],
    site: "@GetStay",
  },
  alternates: {
    canonical: "https://getstay.com",
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
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
};

export default async function Home() {
  const hostels = await getHostels();
  const rooms = await getRoomsForLanding('all', 8);
  const cities = await getCitiesWithHostels();

  // JSON-LD structured data for homepage
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GetStay',
    url: 'https://getstay.com',
    description: 'Find the best hostels and PG accommodations in Bhopal and across India',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://getstay.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GetStay',
    url: 'https://getstay.com',
    logo: 'https://getstay.com/logo.png',
    description: 'Leading hostel and PG accommodation booking platform in Bhopal',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bhopal',
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://facebook.com/getstay',
      'https://twitter.com/getstay',
      'https://instagram.com/getstay',
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />

      <Header />
      <PromoBanner />
      <HostelsSection hostels={hostels} />
      <RoomsSection initialRooms={rooms} />
      <CitiesSection cities={cities} />
      <WhyChooseSection />
      <LocationSection />
      
      {/* Popular Links Section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PopularLinksSection />
      </div>
      
      <Footer />
    </div>
  );
}
