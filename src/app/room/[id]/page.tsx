import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, IndianRupee, Package, ArrowLeft, Building2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DescriptionCard } from "@/components/shared/description-card";
import { getRoomById, getAllRoomIds } from "@/services/room-detail.service";

interface RoomPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const roomIds = await getAllRoomIds();
  
  return roomIds.map((id) => ({
    id,
  }));
}

export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {
  const { id } = await params;
  const room = await getRoomById(id);

  if (!room) {
    return {
      title: "Room Not Found",
    };
  }

  const coverImage = room.images.find(img => img.isCover)?.url || room.images[0]?.url;
  const location = room.hostel.city && room.hostel.state 
    ? `${room.hostel.city}, ${room.hostel.state}`
    : room.hostel.city || room.hostel.state || '';

  const title = `${room.name} at ${room.hostel.name} - ₹${room.rent.toLocaleString('en-IN')}/month | GetStay`;
  const description = `${room.description.slice(0, 150)}... Book this room at ${room.hostel.name} in ${location}. Monthly rent: ₹${room.rent.toLocaleString('en-IN')}. Includes: ${room.components.slice(0, 3).map(c => c.name).join(', ')}.`;

  return {
    title,
    description,
    keywords: [
      room.name,
      room.hostel.name,
      `room in ${room.hostel.city}`,
      'hostel room',
      'pg room',
      'accommodation',
      ...room.components.slice(0, 5).map(c => c.name.toLowerCase()),
    ].filter(Boolean).join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://getstay.com/room/${id}`,
      siteName: 'GetStay',
      locale: 'en_IN',
      images: coverImage ? [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: `${room.name} at ${room.hostel.name}`,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: coverImage ? [coverImage] : [],
    },
    alternates: {
      canonical: `https://getstay.com/room/${id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { id } = await params;
  const room = await getRoomById(id);

  if (!room) {
    notFound();
  }

  const coverImage = room.images.find(img => img.isCover);
  const otherImages = room.images.filter(img => !img.isCover);
  const location = room.hostel.city && room.hostel.state 
    ? `${room.hostel.city}, ${room.hostel.state}`
    : room.hostel.city || room.hostel.state || '';

  // JSON-LD Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: room.name,
    description: room.description,
    image: room.images.map(img => img.url),
    offers: {
      '@type': 'Offer',
      price: room.rent,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    brand: {
      '@type': 'Organization',
      name: room.hostel.name,
    },
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
        name: room.hostel.name,
        item: `https://getstay.com/hostel/${room.hostel.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: room.name,
        item: `https://getstay.com/room/${id}`,
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
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/hostel/${room.hostel.slug}`} className="hover:text-foreground">
                {room.hostel.name}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground" aria-current="page">{room.name}</li>
          </ol>
        </nav>

        {/* Back Button */}
        <Link href={`/hostel/${room.hostel.slug}`}>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {room.hostel.name}
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="mb-2 text-3xl font-bold sm:text-4xl">{room.name}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <Link 
                  href={`/hostel/${room.hostel.slug}`}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <Building2 className="h-4 w-4" />
                  <span>{room.hostel.name}</span>
                </Link>
                {location && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{location}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="mb-1 text-3xl font-bold text-brand-primary">
                <IndianRupee className="inline h-6 w-6" />
                {room.rent.toLocaleString('en-IN')}
              </div>
              <p className="text-sm text-muted-foreground">per month</p>
            </div>
          </div>

          {/* Image Gallery */}
          {room.images.length > 0 && (
            <div className="grid gap-2 sm:grid-cols-4 sm:grid-rows-2">
              {coverImage && (
                <div className="relative h-64 overflow-hidden rounded-lg sm:col-span-2 sm:row-span-2 sm:h-[400px]">
                  <Image
                    src={coverImage.url}
                    alt={coverImage.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              {otherImages.slice(0, 4).map((image, idx) => (
                <div key={idx} className="relative h-32 overflow-hidden rounded-lg sm:h-[196px]">
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Description */}
            <DescriptionCard description={room.description} />

            {/* Components/Amenities */}
            {room.components.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    What's Included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {room.components.map((component) => (
                      <div key={component._id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-brand-primary" />
                        <div>
                          <p className="font-medium">{component.name}</p>
                          <p className="text-sm text-muted-foreground">{component.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card>
              <CardHeader>
                <CardTitle>Book This Room</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold">
                      <IndianRupee className="inline h-5 w-5" />
                      {room.rent.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>
                </div>
                <Button className="w-full" size="lg">
                  Book Now
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Schedule Visit
                </Button>
              </CardContent>
            </Card>

            {/* Hostel Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Hostel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="mb-1 font-medium">{room.hostel.name}</p>
                  {room.hostel.address && (
                    <p className="text-sm text-muted-foreground">{room.hostel.address}</p>
                  )}
                </div>
                {room.hostel.contactNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${room.hostel.contactNumber}`} className="text-sm hover:underline">
                      {room.hostel.contactNumber}
                    </a>
                  </div>
                )}
                {room.hostel.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${room.hostel.email}`} className="text-sm hover:underline">
                      {room.hostel.email}
                    </a>
                  </div>
                )}
                <Link href={`/hostel/${room.hostel.slug}`}>
                  <Button variant="outline" className="w-full">
                    View Hostel Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
