import type { MetadataRoute } from 'next'
import { cms } from '@/lib/cms'
import { pages } from '@/content/data'
import { abs } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await cms.getProducts()
  return [
    { url: abs('/'), changeFrequency: 'monthly', priority: 1 },
    ...products.map((p) => ({
      url: abs(`/oferta/${p.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: p.images.map((i) => abs(i.url)),
    })),
    ...pages.filter((p) => !p.noindex).map((p) => ({ url: abs(`/${p.slug}`), priority: 0.3 })),
  ]
}
