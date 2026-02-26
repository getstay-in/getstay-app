import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HostelCard } from "@/components/shared/hostel-card";
import { RelatedLinksSection } from "@/components/city/related-links-section";
import { 
  getCityBySlug, 
  getHostelsByCity, 
  getCityCategoryPaths,
  CategoryType 
} from "@/services/city.service";

interface CategoryPageProps {
  params: Promise<{
    citySlug: string;
    category: CategoryType;
  }>;
}

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

const categoryInfo: Record<CategoryType, { title: string; description: string; icon: string }> = {
  'girls-hostel': {
    title: 'Girls Hostels',
    description: 'Safe and secure hostels exclusively for girls with modern amenities',
    icon: '👩',
  },
  'boys-hostel': {
    title: 'Boys Hostels',
    description: 'Comfortable and affordable hostels for boys with all facilities',
    icon: '👨',
  },
  'affordable': {
    title: 'Affordable Hostels',
    description: 'Budget-friendly hostels without compromising on quality',
    icon: '💰',
  },
  'best': {
    title: 'Best Hostels',
    description: 'Top-rated hostels with excellent facilities and reviews',
    icon: '⭐',
  },
};

export async function generateStaticParams() {
  const paths = await getCityCategoryPaths();
  
  return paths.map((path) => ({
    citySlug: path.citySlug,
    category: path.category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { citySlug, category } = await params;
  const city = await getCityBySlug(citySlug);

  if (!city) {
    return {
      title: "City Not Found",
    };
  }

  const info = categoryInfo[category];
  const categoryTitle = info.title;
  
  const title = `${categoryTitle} in ${city.name}, ${city.state} | GetStay`;
  const description = `Find the best ${categoryTitle.toLowerCase()} in ${city.name}, ${city.state}. ${info.description}. Book verified hostels on GetStay.`;

  return {
    title,
    description,
    keywords: [
      `${category.replace('-', ' ')} ${city.name}`,
      `${categoryTitle} ${city.name}`,
      `${city.name} ${category}`,
      `PG for ${category.includes('girls') ? 'girls' : category.includes('boys') ? 'boys' : 'students'} ${city.name}`,
      `${category} ${city.state}`,
    ].join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://getstay.in/city/${citySlug}/${category}`,
      siteName: 'GetStay',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://getstay.in/city/${citySlug}/${category}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { citySlug, category } = await params;
  const city = await getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  const hostels = await getHostelsByCity(citySlug, category, 50);

  if (hostels.length === 0) {
    notFound();
  }

  const info = categoryInfo[category];

  // JSON-LD Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${info.title} in ${city.name}, ${city.state}`,
    description: info.description,
    numberOfItems: hostels.length,
    itemListElement: hostels.slice(0, 10).map((hostel, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'LodgingBusiness',
        name: hostel.name,
        url: `https://getstay.in/hostel/${hostel.slug}`,
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
        item: 'https://getstay.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${city.name} Hostels`,
        item: `https://getstay.in/city/${citySlug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: info.title,
        item: `https://getstay.in/city/${citySlug}/${category}`,
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

      <Header pageTitle={`${city.name} - ${info.title}`} showBackButton={true} />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href={`/city/${citySlug}`}>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {city.name} Hostels
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-5xl">{info.icon}</span>
            <div>
              <h1 className="text-4xl font-bold sm:text-5xl">
                {info.title} in <span className="text-brand-primary">{city.name}</span>
              </h1>
              <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{city.state}</span>
              </div>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">{info.description}</p>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{hostels.length}</span> {info.title.toLowerCase()} in {city.name}
          </p>
        </div>

        {/* Hostels Grid */}
        <div className="mb-8">
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
            <CardTitle>About {info.title} in {city.name}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              {info.description} in {city.name}, {city.state}. We have carefully curated {hostels.length} verified 
              {category === 'girls-hostel' && ' girls hostels with enhanced safety features, CCTV surveillance, and female wardens'}
              {category === 'boys-hostel' && ' boys hostels with modern amenities, study rooms, and recreational facilities'}
              {category === 'affordable' && ' budget-friendly hostels that offer great value without compromising on essential amenities'}
              {category === 'best' && ' premium hostels with top-notch facilities, excellent maintenance, and high ratings'}
              .
            </p>
            <p>
              All our listings in {city.name} are verified and offer quality accommodation for students and working professionals. 
              Book your ideal hostel today and enjoy a comfortable stay in {city.name}.
            </p>
          </CardContent>
        </Card>

        {/* Related Links Section */}
        <div className="mt-8">
          <RelatedLinksSection 
            cityName={city.name} 
            citySlug={citySlug}
            state={city.state}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
