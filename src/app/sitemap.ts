import type { MetadataRoute } from 'next'
import { cms } from '@/lib/cms'
import { pages } from '@/content/data'
import { topics } from '@/content/topics'
import { abs } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await cms.getProducts()
  return [
    { url: abs('/'), changeFrequency: 'monthly', priority: 1 },
    ...['/o-mnie', '/metoda', '/ikigai', '/oferta', '/faq', '/kontakt'].map((path) => ({
      url: abs(path),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...topics.map((t) => ({ url: abs(`/${t.slug}`), changeFrequency: 'monthly' as const, priority: 0.9 })),
    ...products.map((p) => ({
      url: abs(`/oferta/${p.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: p.images.map((i) => abs(i.url)),
    })),
    ...pages.filter((p) => !p.noindex).map((p) => ({ url: abs(`/${p.slug}`), priority: 0.3 })),
  ]
}
