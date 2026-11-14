import { renderOgImage } from '@/lib/og'

/** Generowany obrazek Open Graph dla podstron: /og?title=… */
export function GET(request: Request) {
  const title = new URL(request.url).searchParams.get('title') ?? undefined
  const res = renderOgImage(title)
  res.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=31536000, immutable')
  return res
}
