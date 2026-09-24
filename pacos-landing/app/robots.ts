import { MetadataRoute } from 'next'
import { business } from '@/config/business'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    ...(business.demo ? {} : { sitemap: `${business.baseUrl}/sitemap.xml` }),
  }
}
