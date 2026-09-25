import { MetadataRoute } from 'next'
import { business } from '@/config/business'

export default function sitemap(): MetadataRoute.Sitemap {
  if (business.demo) return []
  return [
    {
      url: business.baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}

