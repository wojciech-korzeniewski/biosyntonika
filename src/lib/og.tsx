import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

export const OG_SIZE = { width: 1200, height: 630 }

/** Usuwa doklejoną nazwę marki z końca tytułu SEO („… | BioSyntonika™”). */
export const ogHeading = (title: string) =>
  title.replace(new RegExp(`\\s*[|–-]\\s*${site.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`), '').trim()

/** URL generowanego obrazka OG dla podstrony (trasa /og). */
export const ogImageUrl = (title: string) => `/og?title=${encodeURIComponent(ogHeading(title))}`

/** Wspólny wygląd obrazków OG. Bez `title` – wariant strony głównej. */
export function renderOgImage(title?: string) {
  const heading = title?.slice(0, 120)
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'radial-gradient(circle at 75% 40%, #2a2618 0%, #0d1210 60%)',
          color: '#c2a46b',
        }}
      >
        {heading ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 34, letterSpacing: 2 }}>{site.name}</div>
            <div
              style={{
                fontSize: heading.length > 60 ? 56 : 68,
                lineHeight: 1.15,
                color: '#e6e1d6',
                marginTop: 28,
                maxWidth: 1000,
              }}
            >
              {heading}
            </div>
            <div style={{ fontSize: 26, color: '#9a978d', marginTop: 36 }}>{site.owner}</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 96, letterSpacing: 2 }}>{site.name}</div>
            <div style={{ fontSize: 30, color: '#e6e1d6', marginTop: 24 }}>{site.owner}</div>
          </div>
        )}
        <div style={{ fontSize: 26, color: '#9a978d', marginTop: 16, letterSpacing: 4, textTransform: 'uppercase' }}>
          Naturopatia · Hipnoterapia medyczna · Bydgoszcz
        </div>
      </div>
    ),
    OG_SIZE,
  )
}
