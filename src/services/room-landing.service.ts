import connectDB from '@/lib/mongoose/connection';
import { RoomType } from '@/lib/mongoose/models/room-type.model';
import { RoomComponent } from '@/lib/mongoose/models/room-component.model';
import { HostelProfile } from '@/lib/mongoose/models/hostel-profile.model';

export interface RoomLandingData {
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

export type RoomCategory = 'all' | 'single' | 'double' | 'triple' | 'sharing';

export async function getRoomsForLanding(category: RoomCategory = 'all', limit: number = 8): Promise<RoomLandingData[]> {
  try {
    await connectDB();

    // Get hostels with online presence
    const hostelProfiles = await HostelProfile.find({
      isOnlinePresenceEnabled: true,
    })
      .select('hostel slug basicInfo')
      .lean();

    const hostelIds = hostelProfiles.map(p => p.hostel.toString());
    const hostelMap = new Map(
      hostelProfiles.map(p => [
        p.hostel.toString(),
        {
          name: p.basicInfo.name,
          slug: p.slug || '',
          city: p.basicInfo.city,
          state: p.basicInfo.state,
        }
      ])
    );

    // Build query based on category
    let query: any = { hostelId: { $in: hostelIds } };
    
    if (category !== 'all') {
      // Map category to room name patterns
      const categoryPatterns: Record<string, RegExp> = {
        single: /single|1\s*sharing/i,
        double: /double|2\s*sharing/i,
        triple: /triple|3\s*sharing/i,
        sharing: /sharing/i,
      };
      
      if (categoryPatterns[category]) {
        query.name = categoryPatterns[category];
      }
    }

    // Fetch rooms
    const rooms = await RoomType.find(query)
      .select('name description rent images components hostelId')
      .lean()
      .limit(limit);

    // Fetch components
    const componentIds = rooms.flatMap(r => r.components);
    const components = await RoomComponent.find({ _id: { $in: componentIds } })
      .select('name description')
      .lean();

    const componentMap = new Map(
      components.map(c => [c._id.toString(), { name: c.name, description: c.description }])
    );

    return rooms.map(room => {
      const hostelInfo = hostelMap.get(room.hostelId);
      const coverImage = room.images?.find(img => img.isCover)?.url || room.images?.[0]?.url;

      return {
        _id: room._id.toString(),
        name: room.name,
        description: room.description,
        rent: room.rent,
        coverImage,
        components: room.components
          .map(cId => componentMap.get(cId.toString()))
          .filter(Boolean) as Array<{ name: string; description: string }>,
        hostel: hostelInfo || {
          name: 'Unknown Hostel',
          slug: '',
          city: undefined,
          state: undefined,
        },
      };
    });
  } catch (error) {
    console.error('Error fetching rooms for landing:', error);
    return [];
  }
}
