import connectDB from '@/lib/mongoose/connection';
import { HostelProfile } from '@/lib/mongoose/models/hostel-profile.model';

export type CategoryType = 'girls-hostel' | 'boys-hostel' | 'affordable' | 'best';

export interface CityData {
  slug: string;
  name: string;
  state: string;
  hostelCount: number;
  boysHostelCount: number;
  girlsHostelCount: number;
  minRent: number;
  maxRent: number;
}

export interface CityHostelData {
  _id: string;
  slug: string;
  name: string;
  description?: string;
  city: string;
  state: string;
  address?: string;
  accommodationType?: 'boys' | 'girls' | 'coed' | 'separate';
  totalRooms?: number;
  mainPhoto?: string;
  minRent?: number;
}

// Get all cities that have hostels with online presence
export async function getCitiesWithHostels(): Promise<CityData[]> {
  try {
    await connectDB();

    const hostels = await HostelProfile.find({
      isOnlinePresenceEnabled: true,
      'basicInfo.city': { $exists: true, $ne: '' },
      'basicInfo.state': { $exists: true, $ne: '' },
    })
      .select('basicInfo.city basicInfo.state propertyDetails.accommodationType')
      .lean();

    // Group by city
    const cityMap = new Map<string, {
      name: string;
      state: string;
      total: number;
      boys: number;
      girls: number;
    }>();

    hostels.forEach(hostel => {
      const cityKey = `${hostel.basicInfo.city}-${hostel.basicInfo.state}`.toLowerCase();
      const existing = cityMap.get(cityKey) || {
        name: hostel.basicInfo.city!,
        state: hostel.basicInfo.state!,
        total: 0,
        boys: 0,
        girls: 0,
      };

      existing.total++;
      if (hostel.propertyDetails?.accommodationType === 'boys') {
        existing.boys++;
      } else if (hostel.propertyDetails?.accommodationType === 'girls') {
        existing.girls++;
      }

      cityMap.set(cityKey, existing);
    });

    // Convert to array and create slugs
    return Array.from(cityMap.entries())
      .filter(([_, data]) => data.total >= 3) // Only cities with 3+ hostels
      .map(([_, data]) => ({
        slug: data.name.toLowerCase().replace(/\s+/g, '-'),
        name: data.name,
        state: data.state,
        hostelCount: data.total,
        boysHostelCount: data.boys,
        girlsHostelCount: data.girls,
        minRent: 0, // Will be calculated when needed
        maxRent: 0,
      }))
      .sort((a, b) => b.hostelCount - a.hostelCount);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}

// Get city details by slug
export async function getCityBySlug(citySlug: string): Promise<CityData | null> {
  try {
    await connectDB();

    const cities = await getCitiesWithHostels();
    return cities.find(c => c.slug === citySlug) || null;
  } catch (error) {
    console.error('Error fetching city by slug:', error);
    return null;
  }
}

// Get hostels for a city with optional category filter
export async function getHostelsByCity(
  citySlug: string,
  category?: CategoryType,
  limit: number = 50
): Promise<CityHostelData[]> {
  try {
    await connectDB();

    // Get city name from slug
    const cityName = citySlug.split('-').map(w => 
      w.charAt(0).toUpperCase() + w.slice(1)
    ).join(' ');

    // Build query
    const query: any = {
      isOnlinePresenceEnabled: true,
      'basicInfo.city': new RegExp(`^${cityName}$`, 'i'),
    };

    // Apply category filters
    if (category === 'boys-hostel') {
      query['propertyDetails.accommodationType'] = 'boys';
    } else if (category === 'girls-hostel') {
      query['propertyDetails.accommodationType'] = 'girls';
    }

    let hostels = await HostelProfile.find(query)
      .select('hostel slug basicInfo propertyDetails media')
      .lean()
      .limit(limit);

    // For 'affordable' and 'best', we need to fetch room types to get pricing
    if (category === 'affordable' || category === 'best') {
      // Import RoomType here to avoid circular dependency
      const { RoomType } = await import('@/lib/mongoose/models/room-type.model');
      
      const hostelIds = hostels.map(h => h.hostel?.toString()).filter(Boolean) as string[];
      const roomTypes = await RoomType.find({ hostelId: { $in: hostelIds } })
        .select('hostelId rent')
        .lean();

      // Calculate min rent per hostel
      const rentMap = new Map<string, number>();
      roomTypes.forEach(rt => {
        const current = rentMap.get(rt.hostelId) || Infinity;
        rentMap.set(rt.hostelId, Math.min(current, rt.rent));
      });

      // Filter and sort based on category
      if (category === 'affordable') {
        hostels = hostels
          .filter(h => h.hostel && rentMap.has(h.hostel.toString()))
          .sort((a, b) => {
            const rentA = rentMap.get(a.hostel!.toString()) || Infinity;
            const rentB = rentMap.get(b.hostel!.toString()) || Infinity;
            return rentA - rentB;
          })
          .slice(0, limit);
      } else if (category === 'best') {
        // 'Best' could be based on multiple factors
        // For now, sort by total rooms (popularity indicator)
        hostels = hostels
          .filter(h => h.propertyDetails?.totalRooms)
          .sort((a, b) => 
            (b.propertyDetails?.totalRooms || 0) - (a.propertyDetails?.totalRooms || 0)
          )
          .slice(0, limit);
      }

      // Add min rent to results
      return hostels.map(h => ({
        _id: h._id.toString(),
        slug: h.slug || '',
        name: h.basicInfo.name,
        description: h.basicInfo.description,
        city: h.basicInfo.city || '',
        state: h.basicInfo.state || '',
        address: h.basicInfo.address,
        accommodationType: h.propertyDetails?.accommodationType,
        totalRooms: h.propertyDetails?.totalRooms,
        mainPhoto: h.media?.photos?.find(p => p.isMain)?.url || h.media?.photos?.[0]?.url,
        minRent: h.hostel ? rentMap.get(h.hostel.toString()) : undefined,
      }));
    }

    return hostels.map(h => ({
      _id: h._id.toString(),
      slug: h.slug || '',
      name: h.basicInfo.name,
      description: h.basicInfo.description,
      city: h.basicInfo.city || '',
      state: h.basicInfo.state || '',
      address: h.basicInfo.address,
      accommodationType: h.propertyDetails?.accommodationType,
      totalRooms: h.propertyDetails?.totalRooms,
      mainPhoto: h.media?.photos?.find(p => p.isMain)?.url || h.media?.photos?.[0]?.url,
    }));
  } catch (error) {
    console.error('Error fetching hostels by city:', error);
    return [];
  }
}

// Check if a category has enough hostels to generate a page
export async function shouldGenerateCategoryPage(
  citySlug: string,
  category: CategoryType
): Promise<boolean> {
  try {
    const hostels = await getHostelsByCity(citySlug, category, 3);
    return hostels.length >= 3; // Minimum 3 hostels to generate a category page
  } catch (error) {
    return false;
  }
}

// Get all valid city-category combinations for SSG
export async function getCityCategoryPaths(): Promise<Array<{ citySlug: string; category: CategoryType }>> {
  try {
    const cities = await getCitiesWithHostels();
    const categories: CategoryType[] = ['girls-hostel', 'boys-hostel', 'affordable', 'best'];
    const paths: Array<{ citySlug: string; category: CategoryType }> = [];

    for (const city of cities) {
      for (const category of categories) {
        const shouldGenerate = await shouldGenerateCategoryPage(city.slug, category);
        if (shouldGenerate) {
          paths.push({ citySlug: city.slug, category });
        }
      }
    }

    return paths;
  } catch (error) {
    console.error('Error generating city category paths:', error);
    return [];
  }
}
