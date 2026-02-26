import connectDB from '@/lib/mongoose/connection';
import { HostelProfile } from '@/lib/mongoose/models/hostel-profile.model';
import { RoomType } from '@/lib/mongoose/models/room-type.model';
import { RoomComponent } from '@/lib/mongoose/models/room-component.model';

export interface HostelPhoto {
  url: string;
  title: string;
  description?: string;
  type: 'boys' | 'girls' | 'common' | 'exterior' | 'interior' | 'amenities';
  isMain?: boolean;
}

export interface RoomTypeData {
  _id: string;
  name: string;
  description: string;
  rent: number;
  images: Array<{
    url: string;
    title: string;
    isCover: boolean;
  }>;
  components: Array<{
    name: string;
    description: string;
  }>;
}

export interface HostelDetailProfile {
  _id: string;
  slug: string;
  hostelId: string;
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
    banner?: {
      url: string;
      publicId: string;
    };
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
  roomTypes: RoomTypeData[];
}

export async function getHostelDetailBySlug(slug: string): Promise<HostelDetailProfile | null> {
  try {
    await connectDB();

    const profile = await HostelProfile.findOne({
      slug,
      isOnlinePresenceEnabled: true,
    })
      .select('-city -createdAt -updatedAt -__v')
      .lean();

    if (!profile) {
      return null;
    }

    const hostelId = profile.hostel.toString();

    // Fetch room types for this hostel
    const roomTypes = await RoomType.find({ hostelId })
      .select('name description rent images components')
      .lean();

    // Fetch components for all room types
    const componentIds = roomTypes.flatMap(rt => rt.components);
    const components = await RoomComponent.find({ _id: { $in: componentIds } })
      .select('name description')
      .lean();

    const componentMap = new Map(
      components.map(c => [c._id.toString(), { name: c.name, description: c.description }])
    );

    const roomTypesData: RoomTypeData[] = roomTypes.map(rt => ({
      _id: rt._id.toString(),
      name: rt.name,
      description: rt.description,
      rent: rt.rent,
      images: rt.images || [],
      components: rt.components
        .map(cId => componentMap.get(cId.toString()))
        .filter(Boolean) as Array<{ name: string; description: string }>,
    }));

    return {
      _id: profile._id.toString(),
      slug: profile.slug || slug,
      hostelId,
      basicInfo: profile.basicInfo,
      propertyDetails: profile.propertyDetails,
      locationInfo: profile.locationInfo,
      media: profile.media,
      amenities: profile.amenities || [],
      safetyFeatures: profile.safetyFeatures || [],
      roomTypes: roomTypesData,
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
