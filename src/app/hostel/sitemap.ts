import { MetadataRoute } from 'next';
import { getHostelSlugsForSSG } from '@/services/hostel-detail.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getHostelSlugsForSSG();

  return slugs.map((slug) => ({
    url: `https://getstay.in/hostel/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}
