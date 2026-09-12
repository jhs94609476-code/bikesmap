import { MetadataRoute } from 'next';
import { getBikeStations } from '@/lib/bikeData';
import { ALL_REGION_SLUGS } from '@/lib/regionUtils';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bikesmap.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/about`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/terms`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/privacy`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/contact`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  // 지역 허브 페이지 (pSEO)
  const regionPages: MetadataRoute.Sitemap = ALL_REGION_SLUGS.map((slug) => ({
    url: `${BASE_URL}/region/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const stations = getBikeStations();
  const stationPages: MetadataRoute.Sitemap = stations.map((station) => ({
    url: `${BASE_URL}/bike/${station.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...regionPages, ...stationPages];
}
