import { HostelCard } from "@/components/hostels/hostel-card";

interface HostelWithProfile {
  _id: string;
  name: string;
  description?: string;
  profile?: {
    basicInfo: {
      name: string;
      city: string;
      state: string;
      description: string;
    };
    propertyDetails: {
      totalRooms: number;
      accommodationType: 'boys' | 'girls' | 'coed' | 'separate';
    };
    media: {
      photos: Array<{
        url: string;
        isMain?: boolean;
      }>;
    };
  };
}

interface HostelsSectionProps {
  hostels: HostelWithProfile[];
}

export function HostelsSection({ hostels }: HostelsSectionProps) {
  return (
    <section className="bg-background py-12">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-8">
          <h2 className="mb-2 text-4xl font-light">
            Explore <span className="font-bold text-brand-primary">Hostels</span>
          </h2>
          <p className="text-sm font-light text-muted-foreground">
            Find your perfect stay from our curated selection
          </p>
        </div>

        {/* Hostel cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {hostels.length > 0 ? (
            hostels.map((hostel) => (
              <HostelCard
                key={hostel._id}
                name={hostel.name.length > 25 ? `${hostel.name.slice(0, 22)}...` : hostel.name}
                subtitle={hostel.profile?.basicInfo?.name || hostel.description}
                city={hostel.profile?.basicInfo?.city || "Bhopal"}
                state={hostel.profile?.basicInfo?.state}
                totalRooms={hostel.profile?.propertyDetails?.totalRooms || 30}
                accommodationType={hostel.profile?.propertyDetails?.accommodationType || "boys"}
                mainPhoto={hostel.profile?.media?.photos?.find(p => p.isMain)?.url}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-sm font-light text-muted-foreground">
                No hostels available at the moment
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
