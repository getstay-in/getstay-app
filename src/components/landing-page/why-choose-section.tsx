"use client";

import { useState } from "react";
import { Shield, Search, IndianRupee, Clock, Award, Users, ChevronDown } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Listings",
    description: "All hostels are verified with real photos and accurate information. We personally visit each property to ensure quality standards. No fake listings, no surprises - just honest, transparent information you can trust.",
  },
  {
    icon: Search,
    title: "Easy Search",
    description: "Find your perfect hostel with smart filters and intuitive search. Filter by location, price range, amenities, room type, and more. Our advanced search algorithm helps you discover hostels that match your exact requirements.",
  },
  {
    icon: IndianRupee,
    title: "Best Prices",
    description: "Compare prices across hostels and find the best deals. We ensure transparent pricing with no hidden charges. Get exclusive discounts and offers available only on GetStay. Save money without compromising on quality.",
  },
  {
    icon: Clock,
    title: "Quick Booking",
    description: "Book your hostel in minutes with our streamlined process. Simple forms, instant confirmation, and hassle-free payments. Our efficient system saves you time and gets you settled faster.",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "Only the best hostels make it to our platform. We maintain strict quality standards and regularly audit our listings. Every hostel is evaluated for cleanliness, safety, amenities, and overall living conditions.",
  },
  {
    icon: Users,
    title: "24/7 Support",
    description: "Our dedicated support team is always ready to help. Get assistance with bookings, queries, or issues anytime. We're committed to ensuring your hostel experience is smooth and worry-free.",
  },
];

export function WhyChooseSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-background py-12">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-4xl font-light">
            Why Choose <span className="font-bold text-brand-primary">GetStay</span>
          </h2>
          <p className="text-sm font-light text-muted-foreground">
            We deliver excellence in every booking
          </p>
        </div>

        {/* Accordion */}
        <div className="mx-auto max-w-3xl space-y-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-border bg-background transition-all"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center gap-4 p-6 text-left transition-colors hover:bg-muted/30"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-muted">
                    <Icon className="h-5 w-5 text-brand-primary" />
                  </div>
                  <h3 className="flex-1 text-lg font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 pl-[88px] text-sm font-light leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
