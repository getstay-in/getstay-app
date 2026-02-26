"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

interface CityFAQSectionProps {
  cityName: string;
  faqs: FAQItem[];
}

export function CityFAQSection({ cityName, faqs }: CityFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
        Frequently Asked Questions About Hostels in <span className="text-brand-primary">{cityName}</span>
      </h2>
      
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <Card 
            key={index}
            className="rounded-xl border border-border hover:border-brand-primary/50 transition-colors overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <h3 className="text-base font-bold sm:text-lg">{faq.question}</h3>
              </div>
              <ChevronDown 
                className={`h-5 w-5 shrink-0 text-brand-primary transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {openIndex === index && (
              <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
