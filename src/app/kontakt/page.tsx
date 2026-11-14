import { JsonLd } from '@/components/JsonLd'
import { PageHeader } from '@/components/PageHeader'
import { site } from '@/content/site'
import { pageMetadata, webPageJsonLd } from '@/lib/seo'

const { booking, contact } = site
const path = '/kontakt'
const crumbs = [{ name: 'Kontakt', path }]
const tel = (phone: string) => `tel:${phone.replace(/\s/g, '')}`

export const metadata = pageMetadata({ title: booking.seoTitle, description: booking.description, path })

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({ path, title: booking.title, description: booking.description, crumbs, type: 'ContactPage' })}
      />
      <PageHeader eyebrow="Kontakt" title={booking.title} lead={booking.text} crumbs={crumbs} />
      <section className="section">
        <div className="container split">
          <div>
            <p className="big-phone">
              <a href={tel(contact.bookingPhone)}>{contact.bookingPhone}</a>
            </p>
            <div className="prose">
              <h2>Jak się umówić</h2>
              <ul>
                {booking.howTo.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
          <address className="panel">
            <h3>Gabinet w Bydgoszczy</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{contact.address}</p>
            <p>
              <a href={booking.mapsUrl} target="_blank" rel="noopener noreferrer">
                Otwórz w Mapach Google →
              </a>
            </p>
            <h3>Telefon i e-mail</h3>
            {contact.phones.map((p) => (
              <p key={p}>
                <a href={tel(p)}>{p}</a>
              </p>
            ))}
            <p>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
            <h3>Obszar</h3>
            <p>{contact.areaServed.join(' · ')}</p>
          </address>
        </div>
      </section>
    </>
  )
}
