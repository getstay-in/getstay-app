import { MetadataRoute } from 'next';
import { getHostelSlugsForSSG } from '@/services/hostel-detail.service';
import { getAllRoomIds } from '@/services/room-detail.service';
import { getCitiesWithHostels, getCityCategoryPaths } from '@/services/city.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getHostelSlugsForSSG();
  const roomIds = await getAllRoomIds();
  const cities = await getCitiesWithHostels();
  const cityCategories = await getCityCategoryPaths();

  const hostelPages = slugs.map((slug) => ({
    url: `https://getstay.in/hostel/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const roomPages = roomIds.map((id) => ({
    url: `https://getstay.in/room/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const cityPages = cities.map((city) => ({
    url: `https://getstay.in/city/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const categoryPages = cityCategories.map((path) => ({
    url: `https://getstay.in/city/${path.citySlug}/${path.category}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.85,
  }));

  return [
    {
      url: 'https://getstay.in',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...cityPages,
    ...categoryPages,
    ...hostelPages,
    ...roomPages,
  ];
}
