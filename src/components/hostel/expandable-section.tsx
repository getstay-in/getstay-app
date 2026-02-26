"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableSectionProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  defaultExpanded?: boolean;
}

export function ExpandableSection({ 
  title, 
  content, 
  icon,
  defaultExpanded = false
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <Card className="mb-6 py-4 shadow-none overflow-hidden border border-border transition-all duration-300">
      <CardContent className="p-0">
        {/* Header - Always Visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center gap-4 px-4 text-left transition-colors duration-200 "
          aria-expanded={isExpanded}
          aria-controls={`${title.toLowerCase().replace(/\s+/g, '-')}-content`}
        >
          {/* Icon Container */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-muted transition-colors duration-200">
            {icon}
          </div>

          {/* Title */}
          <h3 className="flex-1 text-xl font-bold transition-colors duration-200">
            {title}
          </h3>

          {/* Chevron Icon */}
          <div className="shrink-0 transition-transform duration-300">
            {isExpanded ? (
              <ChevronUp className="h-6 w-6 text-foreground" />
            ) : (
              <ChevronDown className="h-6 w-6 text-foreground" />
            )}
          </div>
        </button>

        {/* Expandable Content */}
        <div
          id={`${title.toLowerCase().replace(/\s+/g, '-')}-content`}
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-6 pl-8 ">
            <p className="text-base leading-relaxed text-muted-foreground">
              {content}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
