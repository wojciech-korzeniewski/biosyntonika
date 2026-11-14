import type { MetadataRoute } from 'next'
import { abs } from '@/lib/seo'

/** Wszystkie wyszukiwarki i boty AI (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) mają dostęp. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: abs('/sitemap.xml'),
    host: abs('/'),
  }
}
