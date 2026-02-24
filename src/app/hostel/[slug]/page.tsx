import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Phone, Mail, Building2, Users, Calendar, Home, Shield, Wifi } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  const title = `${hostel.basicInfo.name} - GetStay`;
  const description = hostel.basicInfo.description || `Book ${hostel.basicInfo.name} with GetStay. Modern hostel with great amenities.`;
  const mainPhoto = hostel.media.photos.find(p => p.isMain)?.url || hostel.media.photos[0]?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: mainPhoto ? [{ url: mainPhoto }] : [],
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section with Images */}
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="mb-2 text-3xl font-bold sm:text-4xl">{hostel.basicInfo.name}</h1>
              <div className="flex flex-wrap items-center gap-3">
                {hostel.basicInfo.city && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{hostel.basicInfo.city}{hostel.basicInfo.state && `, ${hostel.basicInfo.state}`}</span>
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
            <div className="grid gap-2 sm:grid-cols-4">
              {mainPhoto && (
                <div className="relative h-64 overflow-hidden rounded-lg sm:col-span-2 sm:row-span-2 sm:h-full">
                  <Image
                    src={mainPhoto.url}
                    alt={mainPhoto.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              {otherPhotos.slice(0, 4).map((photo, idx) => (
                <div key={idx} className="relative h-32 overflow-hidden rounded-lg sm:h-full">
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    fill
                    className="object-cover"
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
              <p className="text-muted-foreground">{hostel.basicInfo.description}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
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
