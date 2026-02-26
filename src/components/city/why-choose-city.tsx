import { GraduationCap, IndianRupee, Shield, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WhyChooseCityProps {
  cityName: string;
}

export function WhyChooseCity({ cityName }: WhyChooseCityProps) {
  const isBhopal = cityName.toLowerCase() === 'bhopal';

  const reasons = isBhopal ? [
    {
      icon: GraduationCap,
      title: "Educational Hub",
      description: "Home to premier institutions like MANIT, AIIMS, LNCT, and Barkatullah University"
    },
    {
      icon: IndianRupee,
      title: "Affordable Living",
      description: "Lower cost of living compared to metros, with hostels starting from ₹4,500/month"
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Known as the City of Lakes, Bhopal offers a safe and peaceful environment for students"
    },
    {
      icon: Zap,
      title: "Good Connectivity",
      description: "Well-connected by road, rail, and air with excellent local transport infrastructure"
    }
  ] : [
    {
      icon: GraduationCap,
      title: "Educational Opportunities",
      description: `${cityName} offers quality educational institutions and learning opportunities`
    },
    {
      icon: IndianRupee,
      title: "Affordable Options",
      description: "Find budget-friendly hostels and PG accommodations that fit your needs"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Verified hostels with proper security measures for your peace of mind"
    },
    {
      icon: Zap,
      title: "Modern Amenities",
      description: "Hostels equipped with WiFi, food, and other essential facilities"
    }
  ];

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
        Why Choose Hostels in <span className="text-brand-primary">{cityName}</span>?
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason, index) => {
          const Icon = reason.icon;
          return (
            <Card 
              key={index}
              className="rounded-xl border border-border hover:border-brand-primary/50 transition-colors"
            >
              <CardContent className="p-4">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10">
                  <Icon className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="mb-2 text-base font-bold">{reason.title}</h3>
                <p className="text-xs font-light leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
