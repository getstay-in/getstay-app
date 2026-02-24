import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Phone, Mail, Building2, Users, Calendar, Home, Shield, Wifi, Bed } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoomCard } from "@/components/hostel/room-card";
import { getHostelDetailBySlug, getHostelSlugsForSSG } from "@/services/hostel-detail.service";

interface HostelPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getHostelSlugsForSSG();
  
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: HostelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const hostel = await getHostelDetailBySlug(slug);

  if (!hostel) {
    return {
      title: "Hostel Not Found",
    };
  }

  const mainPhoto = hostel.media.photos.find(p => p.isMain)?.url || hostel.media.photos[0]?.url;
  const location = hostel.basicInfo.city && hostel.basicInfo.state 
    ? `${hostel.basicInfo.city}, ${hostel.basicInfo.state}`
    : hostel.basicInfo.city || hostel.basicInfo.state || 'India';
  
  const accommodationType = hostel.propertyDetails.accommodationType || 'hostel';
  const minRent = hostel.roomTypes.length > 0 
    ? Math.min(...hostel.roomTypes.map(r => r.rent))
    : null;

  // SEO-optimized title and description
  const title = `${hostel.basicInfo.name} - ${accommodationType.charAt(0).toUpperCase() + accommodationType.slice(1)} in ${location} | GetStay`;
  const description = hostel.basicInfo.description 
    ? `${hostel.basicInfo.description.slice(0, 150)}... Book now on GetStay.`
    : `Book ${hostel.basicInfo.name}, a ${accommodationType} hostel in ${location}. ${hostel.propertyDetails.totalRooms || 'Multiple'} rooms available${minRent ? ` starting from ₹${minRent.toLocaleString('en-IN')}/month` : ''}. Modern amenities, safe environment. Book on GetStay.`;

  // Keywords for SEO
  const keywords = [
    hostel.basicInfo.name,
    `${accommodationType} hostel`,
    `hostel in ${hostel.basicInfo.city}`,
    hostel.basicInfo.state && `hostel in ${hostel.basicInfo.state}`,
    'student accommodation',
    'pg accommodation',
    'hostel booking',
    'affordable hostel',
    ...hostel.amenities.filter(a => a.available).slice(0, 5).map(a => a.name.toLowerCase()),
  ].filter(Boolean);

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'GetStay' }],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://getstay.com/hostel/${slug}`,
      siteName: 'GetStay',
      locale: 'en_IN',
      images: mainPhoto ? [
        {
          url: mainPhoto,
          width: 1200,
          height: 630,
          alt: `${hostel.basicInfo.name} - ${accommodationType} hostel in ${location}`,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: mainPhoto ? [mainPhoto] : [],
      site: '@GetStay',
    },
    alternates: {
      canonical: `https://getstay.com/hostel/${slug}`,
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

export default async function HostelPage({ params }: HostelPageProps) {
  const { slug } = await params;
  const hostel = await getHostelDetailBySlug(slug);

  if (!hostel) {
    notFound();
  }

  const mainPhoto = hostel.media.photos.find(p => p.isMain);
  const otherPhotos = hostel.media.photos.filter(p => !p.isMain);
  const displayType = hostel.propertyDetails.accommodationType === 'coed' 
    ? 'CO-ED' 
    : hostel.propertyDetails.accommodationType?.toUpperCase() || 'HOSTEL';

  const location = hostel.basicInfo.city && hostel.basicInfo.state 
    ? `${hostel.basicInfo.city}, ${hostel.basicInfo.state}`
    : hostel.basicInfo.city || hostel.basicInfo.state || '';

  // Calculate price range for structured data
  const minRent = hostel.roomTypes.length > 0 
    ? Math.min(...hostel.roomTypes.map(r => r.rent))
    : null;
  const maxRent = hostel.roomTypes.length > 0 
    ? Math.max(...hostel.roomTypes.map(r => r.rent))
    : null;

  // JSON-LD Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `https://getstay.com/hostel/${slug}`,
    name: hostel.basicInfo.name,
    description: hostel.basicInfo.description || `${hostel.basicInfo.name} - Modern hostel accommodation`,
    url: `https://getstay.com/hostel/${slug}`,
    image: hostel.media.photos.map(p => p.url),
    address: {
      '@type': 'PostalAddress',
      streetAddress: hostel.basicInfo.address,
      addressLocality: hostel.basicInfo.city,
      addressRegion: hostel.basicInfo.state,
      postalCode: hostel.basicInfo.pincode,
      addressCountry: 'IN',
    },
    ...(hostel.locationInfo.latitude && hostel.locationInfo.longitude && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: hostel.locationInfo.latitude,
        longitude: hostel.locationInfo.longitude,
      },
    }),
    telephone: hostel.basicInfo.contactNumber,
    email: hostel.basicInfo.email,
    ...(minRent && {
      priceRange: maxRent && minRent !== maxRent 
        ? `₹${minRent.toLocaleString('en-IN')} - ₹${maxRent.toLocaleString('en-IN')}`
        : `₹${minRent.toLocaleString('en-IN')}`,
    }),
    amenityFeature: hostel.amenities
      .filter(a => a.available)
      .map(a => ({
        '@type': 'LocationFeatureSpecification',
        name: a.name,
        value: true,
      })),
    numberOfRooms: hostel.propertyDetails.totalRooms,
    ...(hostel.propertyDetails.establishedYear && {
      foundingDate: hostel.propertyDetails.establishedYear.toString(),
    }),
  };

  // BreadcrumbList structured data
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
        name: 'Hostels',
        item: 'https://getstay.com/#hostels',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: hostel.basicInfo.name,
        item: `https://getstay.com/hostel/${slug}`,
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation for SEO */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <a href="/" className="hover:text-foreground">Home</a>
            </li>
            <li>/</li>
            <li>
              <a href="/#hostels" className="hover:text-foreground">Hostels</a>
            </li>
            <li>/</li>
            <li className="text-foreground" aria-current="page">{hostel.basicInfo.name}</li>
          </ol>
        </nav>

        {/* Hero Section with Images */}
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="mb-2 text-3xl font-bold sm:text-4xl">{hostel.basicInfo.name}</h1>
              <div className="flex flex-wrap items-center gap-3">
                {location && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span itemProp="address">{location}</span>
                  </div>
                )}
                <Badge variant="secondary" className="text-xs font-bold">
                  {displayType}
                </Badge>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          {hostel.media.photos.length > 0 && (
            <div className="grid gap-2 sm:grid-cols-4" itemScope itemType="https://schema.org/ImageGallery">
              {mainPhoto && (
                <div className="relative h-64 overflow-hidden rounded-lg sm:col-span-2 sm:row-span-2 sm:h-full">
                  <Image
                    src={mainPhoto.url}
                    alt={`${hostel.basicInfo.name} - ${mainPhoto.title}`}
                    fill
                    className="object-cover"
                    priority
                    itemProp="image"
                  />
                </div>
              )}
              {otherPhotos.slice(0, 4).map((photo, idx) => (
                <div key={idx} className="relative h-32 overflow-hidden rounded-lg sm:h-full">
                  <Image
                    src={photo.url}
                    alt={`${hostel.basicInfo.name} - ${photo.title}`}
                    fill
                    className="object-cover"
                    itemProp="image"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        {hostel.basicInfo.description && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground" itemProp="description">{hostel.basicInfo.description}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Available Rooms */}
            {hostel.roomTypes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bed className="h-5 w-5" />
                    Available Rooms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {hostel.roomTypes.map((room) => (
                      <RoomCard
                        key={room._id}
                        name={room.name}
                        description={room.description}
                        rent={room.rent}
                        coverImage={room.images.find(img => img.isCover)?.url || room.images[0]?.url}
                        components={room.components}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {hostel.propertyDetails.totalRooms && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        <span className="font-medium">{hostel.propertyDetails.totalRooms}</span> Rooms
                      </span>
                    </div>
                  )}
                  {hostel.propertyDetails.totalFloors && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        <span className="font-medium">{hostel.propertyDetails.totalFloors}</span> Floors
                      </span>
                    </div>
                  )}
                  {hostel.propertyDetails.buildingType && (
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm capitalize">{hostel.propertyDetails.buildingType}</span>
                    </div>
                  )}
                  {hostel.propertyDetails.establishedYear && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Est. {hostel.propertyDetails.establishedYear}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            {hostel.amenities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wifi className="h-5 w-5" />
                    Amenities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {hostel.amenities.filter(a => a.available).map((amenity, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-brand-primary" />
                        <div>
                          <p className="text-sm font-medium">{amenity.name}</p>
                          {amenity.description && (
                            <p className="text-xs text-muted-foreground">{amenity.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Safety Features */}
            {hostel.safetyFeatures.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Safety Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {hostel.safetyFeatures.filter(s => s.available).map((safety, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                        <div>
                          <p className="text-sm font-medium">{safety.feature}</p>
                          {safety.details && (
                            <p className="text-xs text-muted-foreground">{safety.details}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Nearby Landmarks */}
            {hostel.locationInfo.nearbyLandmarks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Nearby Landmarks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {hostel.locationInfo.nearbyLandmarks.map((landmark, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                        <div>
                          <p className="text-sm font-medium">{landmark.name}</p>
                          <p className="text-xs capitalize text-muted-foreground">{landmark.type}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">{landmark.distance}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {hostel.basicInfo.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p>{hostel.basicInfo.address}</p>
                      {hostel.basicInfo.landmark && (
                        <p className="text-muted-foreground">Near {hostel.basicInfo.landmark}</p>
                      )}
                      {hostel.basicInfo.pincode && (
                        <p className="text-muted-foreground">PIN: {hostel.basicInfo.pincode}</p>
                      )}
                    </div>
                  </div>
                )}
                {hostel.basicInfo.contactNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${hostel.basicInfo.contactNumber}`} className="text-sm hover:underline">
                      {hostel.basicInfo.contactNumber}
                    </a>
                  </div>
                )}
                {hostel.basicInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${hostel.basicInfo.email}`} className="text-sm hover:underline">
                      {hostel.basicInfo.email}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Transport Connectivity */}
            {hostel.locationInfo.transportConnectivity.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Transport</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {hostel.locationInfo.transportConnectivity.map((transport, idx) => (
                    <div key={idx} className="border-b border-border pb-2 last:border-0">
                      <div className="mb-1 flex items-center justify-between">
                        <p className="text-sm font-medium capitalize">{transport.mode}</p>
                        <Badge variant="outline" className="text-xs">{transport.distance}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{transport.details}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Map Link */}
            {hostel.locationInfo.googleMapLink && (
              <Card>
                <CardContent className="pt-6">
                  <a
                    href={hostel.locationInfo.googleMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary/90"
                  >
                    <MapPin className="h-4 w-4" />
                    View on Google Maps
                  </a>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
