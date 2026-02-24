"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DescriptionCardProps {
  description: string;
  maxLength?: number;
}

export function DescriptionCard({ description, maxLength = 300 }: DescriptionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = description.length > maxLength;
  
  const displayText = shouldTruncate && !isExpanded 
    ? description.slice(0, maxLength) + '...' 
    : description;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground" itemProp="description">
          {displayText}
        </p>
        {shouldTruncate && (
          <Button
            variant="link"
            className="mt-2 h-auto p-0 text-brand-primary"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
