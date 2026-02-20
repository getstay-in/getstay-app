import connectDB from '@/lib/mongoose/connection';
import { Hostel } from '@/lib/mongoose/models/hostel.model';
import { HostelProfile } from '@/lib/mongoose/models/hostel-profile.model';
import { Organisation } from '@/lib/mongoose/models/organisation.model';

export interface HostelWithProfile {
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

export async function getHostels(): Promise<HostelWithProfile[]> {
  try {
    await connectDB();

    const orgIdsWithOnlinePresence = await Organisation.find({
      isOnlinePresenceEnabled: true,
    })
      .select('_id')
      .lean();
    const allowedOrgIds = orgIdsWithOnlinePresence.map((o) => o._id);

    const hostels = await Hostel.find({
      organisation: { $in: allowedOrgIds },
    })
      .select('name description')
      .lean()
      .limit(8);

    const hostelIds = hostels.map(h => h._id);
    
    const profiles = await HostelProfile.find({
      hostel: { $in: hostelIds }
    })
      .select('hostel basicInfo propertyDetails media')
      .lean();

    const profileMap = new Map(
      profiles.map(p => [p.hostel.toString(), p])
    );

    return hostels.map(hostel => ({
      _id: hostel._id.toString(),
      name: hostel.name,
      description: hostel.description,
      profile: profileMap.get(hostel._id.toString()),
    }));
  } catch (error) {
    console.error('Error fetching hostels:', error);
    return [];
  }
}
