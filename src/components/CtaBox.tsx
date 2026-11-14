import Link from 'next/link'
import { site } from '@/content/site'

const tel = (phone: string) => `tel:${phone.replace(/\s/g, '')}`

export function CtaBox({
  title = 'Umów wizytę',
  text = 'Sesje stacjonarne umawiamy telefonicznie, sesje online w kalendarzu.',
  productHref,
}: {
  title?: string
  text?: string
  productHref?: string
}) {
  return (
    <aside className="cta-box">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="cta-actions">
        <a href={tel(site.contact.bookingPhone)} className="btn btn-solid">
          {site.contact.bookingPhone}
        </a>
        {productHref ? (
          <Link href={productHref} className="btn btn-outline">
            Zobacz ofertę
          </Link>
        ) : (
          <Link href="/kontakt" className="btn btn-outline">
            Kontakt
          </Link>
        )}
      </div>
    </aside>
  )
}
