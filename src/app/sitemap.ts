import { MetadataRoute } from 'next';
import { getHostelSlugsForSSG } from '@/services/hostel-detail.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getHostelSlugsForSSG();

  const hostelPages = slugs.map((slug) => ({
    url: `https://getstay.com/hostel/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://getstay.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...hostelPages,
  ];
}
