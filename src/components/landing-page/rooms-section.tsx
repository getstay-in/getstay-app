"use client";

import { useState } from "react";
import { RoomLandingCard } from "@/components/shared/room-landing-card";
import { Badge } from "@/components/ui/badge";

export type RoomCategory = 'all' | 'single' | 'double' | 'triple' | 'sharing';

interface RoomData {
  _id: string;
  name: string;
  description: string;
  rent: number;
  coverImage?: string;
  components: Array<{
    name: string;
    description: string;
  }>;
  hostel: {
    name: string;
    slug: string;
    city?: string;
    state?: string;
  };
}

interface RoomsSectionProps {
  initialRooms: RoomData[];
}

const categories: Array<{ value: RoomCategory; label: string }> = [
  { value: 'all', label: 'All Rooms' },
  { value: 'single', label: 'Single Sharing' },
  { value: 'double', label: 'Double Sharing' },
  { value: 'triple', label: 'Triple Sharing' },
  { value: 'sharing', label: 'Sharing' },
];

export function RoomsSection({ initialRooms }: RoomsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<RoomCategory>('all');
  const [rooms, setRooms] = useState<RoomData[]>(initialRooms);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = async (category: RoomCategory) => {
    setSelectedCategory(category);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/rooms?category=${category}`);
      if (response.ok) {
        const data = await response.json();
        setRooms(data.rooms || []);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-8">
          <h2 className="mb-2 text-4xl font-light">
            Browse <span className="font-bold text-brand-primary">Rooms</span>
          </h2>
          <p className="text-sm font-light text-muted-foreground">
            Find the perfect room that fits your needs and budget
          </p>
        </div>

        {/* Category Pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                selectedCategory === category.value
                  ? "bg-brand-primary text-white hover:bg-brand-primary/90"
                  : "hover:border-brand-primary/50"
              }`}
              onClick={() => handleCategoryChange(category.value)}
            >
              {category.label}
            </Badge>
          ))}
        </div>

        {/* Room cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="h-80 animate-pulse rounded-2xl bg-muted"
              />
            ))
          ) : rooms.length > 0 ? (
            rooms.map((room) => (
              <RoomLandingCard
                key={room._id}
                roomId={room._id}
                name={room.name}
                description={room.description}
                rent={room.rent}
                coverImage={room.coverImage}
                components={room.components}
                hostelName={room.hostel.name}
                hostelCity={room.hostel.city}
                hostelState={room.hostel.state}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-sm font-light text-muted-foreground">
                No rooms available in this category
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
