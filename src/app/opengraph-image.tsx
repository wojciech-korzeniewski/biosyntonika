import { site } from '@/content/site'
import { OG_SIZE, renderOgImage } from '@/lib/og'

export const alt = `${site.name} – ${site.owner}`
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OpengraphImage() {
  return renderOgImage()
}
