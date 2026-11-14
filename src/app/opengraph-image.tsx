import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

export const alt = `${site.name} – ${site.owner}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
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
        <div style={{ fontSize: 96, letterSpacing: 2 }}>{site.name}</div>
        <div style={{ fontSize: 30, color: '#e6e1d6', marginTop: 24 }}>{site.owner}</div>
        <div style={{ fontSize: 26, color: '#9a978d', marginTop: 16, letterSpacing: 4, textTransform: 'uppercase' }}>
          Naturopatia · Hipnoterapia medyczna · Bydgoszcz
        </div>
      </div>
    ),
    size,
  )
}
