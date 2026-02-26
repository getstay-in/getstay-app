"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

interface DescriptionCardProps {
  description: string;
  maxLength?: number;
  title?: string;
  icon?: React.ReactNode;
}

export function DescriptionCard({ 
  description, 
  maxLength = 300,
  title = "About",
  icon
}: DescriptionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = description.length > maxLength;
  const displayText = !isExpanded && shouldTruncate 
    ? description.slice(0, maxLength) + "..." 
    : description;

  return (
    <Card className="rounded-xl border border-border hover:border-brand-primary/50 transition-colors overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          {/* Icon Container */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
            {icon || <Info className="h-5 w-5" />}
          </div>

          {/* Title */}
          <h3 className="flex-1 text-base font-bold sm:text-lg">
            {title}
          </h3>
        </div>

        {/* Description Content */}
        <div className="space-y-3">
          <p 
            className="text-sm font-light leading-relaxed text-muted-foreground" 
            itemProp="description"
          >
            {displayText}
          </p>

          {/* Read More/Less Button */}
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-brand-primary/80 transition-colors"
              aria-expanded={isExpanded}
            >
              {isExpanded ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="h-3.5 w-3.5" />
                </>
              ) : (
                <>
                  <span>Read More</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
