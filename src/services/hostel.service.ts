import connectDB from '@/lib/mongoose/connection';
import { HostelProfile } from '@/lib/mongoose/models/hostel-profile.model';

export interface HostelWithProfile {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  profile?: {
    basicInfo: {
      name: string;
      city?: string;
      state?: string;
      description?: string;
    };
    propertyDetails: {
      totalRooms?: number;
      accommodationType?: 'boys' | 'girls' | 'coed' | 'separate';
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

    const hostelProfiles = await HostelProfile.find({
      isOnlinePresenceEnabled: true,
    })
      .select('hostel slug basicInfo propertyDetails media')
      .lean()
      .limit(8);

    return hostelProfiles.map(profile => ({
      _id: profile.hostel.toString(),
      name: profile.basicInfo.name,
      slug: profile.slug,
      description: profile.basicInfo.description,
      profile: {
        basicInfo: profile.basicInfo,
        propertyDetails: profile.propertyDetails,
        media: profile.media,
      },
    }));
  } catch (error) {
    console.error('Error fetching hostels:', error);
    return [];
  }
}

export async function getHostelSlugs(): Promise<string[]> {
  try {
    await connectDB();

    const hostelProfiles = await HostelProfile.find({
      isOnlinePresenceEnabled: true,
      slug: { $exists: true, $ne: null },
    })
      .select('slug')
      .lean();

    return hostelProfiles.map(profile => profile.slug).filter(Boolean) as string[];
  } catch (error) {
    console.error('Error fetching hostel slugs:', error);
    return [];
  }
}

export async function getHostelBySlug(slug: string): Promise<HostelWithProfile | null> {
  try {
    await connectDB();

    const profile = await HostelProfile.findOne({
      slug,
      isOnlinePresenceEnabled: true,
    })
      .select('hostel slug basicInfo propertyDetails media locationInfo amenities safetyFeatures')
      .lean();

    if (!profile) {
      return null;
    }

    return {
      _id: profile.hostel.toString(),
      name: profile.basicInfo.name,
      slug: profile.slug,
      description: profile.basicInfo.description,
      profile: {
        basicInfo: profile.basicInfo,
        propertyDetails: profile.propertyDetails,
        media: profile.media,
      },
    };
  } catch (error) {
    console.error('Error fetching hostel by slug:', error);
    return null;
  }
}
