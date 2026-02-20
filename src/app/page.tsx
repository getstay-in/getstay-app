import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PromoBanner } from "@/components/shared/promo-banner";
import { HeroSection } from "@/components/shared/hero-section";
import { HostelsSection } from "@/components/hostels/hostels-section";
import { getHostels } from "@/services/hostel.service";

export const metadata: Metadata = {
  title: "GetStay - Explore Hostels in Bhopal | Modern Hostel Booking",
  description: "Book hostels in Bhopal with GetStay. Get 20% off on your first booking. Find boys and girls hostels with modern amenities. Use code: GETSTAY20",
  keywords: ["hostel booking", "Bhopal hostels", "student accommodation", "boys hostel", "girls hostel", "affordable stay"],
  openGraph: {
    title: "GetStay - Explore Hostels in Bhopal",
    description: "Book hostels in Bhopal with GetStay. Get 20% off on your first booking.",
    images: [{ url: "/banners/BANNER1.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetStay - Explore Hostels in Bhopal",
    description: "Book hostels in Bhopal with GetStay. Get 20% off on your first booking.",
    images: ["/banners/BANNER1.png"],
  },
  alternates: {
    canonical: "https://getstay.com",
  },
};

export default async function Home() {
  const hostels = await getHostels();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PromoBanner />
      <HeroSection />
      <HostelsSection hostels={hostels} />
      <Footer />
    </div>
  );
}
