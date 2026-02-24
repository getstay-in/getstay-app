import connectDB from '@/lib/mongoose/connection';
import { RoomType } from '@/lib/mongoose/models/room-type.model';
import { RoomComponent } from '@/lib/mongoose/models/room-component.model';
import { HostelProfile } from '@/lib/mongoose/models/hostel-profile.model';

export interface RoomComponentDetail {
  _id: string;
  name: string;
  description: string;
}

export interface RoomDetailData {
  _id: string;
  name: string;
  description: string;
  rent: number;
  images: Array<{
    url: string;
    title: string;
    isCover: boolean;
  }>;
  components: RoomComponentDetail[];
  hostel: {
    _id: string;
    slug: string;
    name: string;
    city?: string;
    state?: string;
    address?: string;
    contactNumber?: string;
    email?: string;
  };
}

export async function getRoomById(roomId: string): Promise<RoomDetailData | null> {
  try {
    await connectDB();

    const room = await RoomType.findById(roomId)
      .select('name description rent images components hostelId')
      .lean();

    if (!room) {
      return null;
    }

    // Fetch components
    const components = await RoomComponent.find({ _id: { $in: room.components } })
      .select('name description')
      .lean();

    // Fetch hostel profile
    const hostelProfile = await HostelProfile.findOne({ hostel: room.hostelId })
      .select('slug basicInfo')
      .lean();

    if (!hostelProfile) {
      return null;
    }

    return {
      _id: room._id.toString(),
      name: room.name,
      description: room.description,
      rent: room.rent,
      images: room.images || [],
      components: components.map(c => ({
        _id: c._id.toString(),
        name: c.name,
        description: c.description,
      })),
      hostel: {
        _id: room.hostelId,
        slug: hostelProfile.slug || '',
        name: hostelProfile.basicInfo.name,
        city: hostelProfile.basicInfo.city,
        state: hostelProfile.basicInfo.state,
        address: hostelProfile.basicInfo.address,
        contactNumber: hostelProfile.basicInfo.contactNumber,
        email: hostelProfile.basicInfo.email,
      },
    };
  } catch (error) {
    console.error('Error fetching room by ID:', error);
    return null;
  }
}

export async function getAllRoomIds(): Promise<string[]> {
  try {
    await connectDB();

    // Get all hostels with online presence
    const hostelProfiles = await HostelProfile.find({
      isOnlinePresenceEnabled: true,
    })
      .select('hostel')
      .lean();

    const hostelIds = hostelProfiles.map(p => p.hostel.toString());

    // Get all room types for these hostels
    const rooms = await RoomType.find({ hostelId: { $in: hostelIds } })
      .select('_id')
      .lean();

    return rooms.map(r => r._id.toString());
  } catch (error) {
    console.error('Error fetching room IDs:', error);
    return [];
  }
}
