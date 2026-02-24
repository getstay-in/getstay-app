import connectDB from '@/lib/mongoose/connection';
import { HostelProfile } from '@/lib/mongoose/models/hostel-profile.model';

export interface HostelPhoto {
  url: string;
  title: string;
  description?: string;
  type: 'boys' | 'girls' | 'common' | 'exterior' | 'interior' | 'amenities';
  isMain?: boolean;
}

export interface HostelDetailProfile {
  _id: string;
  slug: string;
  basicInfo: {
    name: string;
    description?: string;
    address?: string;
    landmark?: string;
    city?: string;
    state?: string;
    pincode?: string;
    contactNumber?: string;
    email?: string;
  };
  propertyDetails: {
    totalFloors?: number;
    totalRooms?: number;
    accommodationType?: 'boys' | 'girls' | 'coed' | 'separate';
    establishedYear?: number;
    buildingType?: 'independent' | 'apartment' | 'commercial';
  };
  locationInfo: {
    googleMapLink?: string;
    latitude?: number;
    longitude?: number;
    nearbyLandmarks: Array<{
      name: string;
      distance: string;
      type: 'hospital' | 'school' | 'market' | 'transport' | 'other';
    }>;
    transportConnectivity: Array<{
      mode: 'bus' | 'metro' | 'train' | 'auto';
      distance: string;
      details: string;
    }>;
  };
  media: {
    photos: HostelPhoto[];
    virtualTourLink?: string;
  };
  amenities: Array<{
    name: string;
    available: boolean;
    description?: string;
    floor?: string;
  }>;
  safetyFeatures: Array<{
    feature: string;
    available: boolean;
    details?: string;
  }>;
}

export async function getHostelDetailBySlug(slug: string): Promise<HostelDetailProfile | null> {
  try {
    await connectDB();

    const profile = await HostelProfile.findOne({
      slug,
      isOnlinePresenceEnabled: true,
    })
      .select('-hostel -city -createdAt -updatedAt -__v')
      .lean();

    if (!profile) {
      return null;
    }

    return {
      _id: profile._id.toString(),
      slug: profile.slug || slug,
      basicInfo: profile.basicInfo,
      propertyDetails: profile.propertyDetails,
      locationInfo: profile.locationInfo,
      media: profile.media,
      amenities: profile.amenities || [],
      safetyFeatures: profile.safetyFeatures || [],
    };
  } catch (error) {
    console.error('Error fetching hostel detail by slug:', error);
    return null;
  }
}

export async function getHostelSlugsForSSG(): Promise<string[]> {
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
