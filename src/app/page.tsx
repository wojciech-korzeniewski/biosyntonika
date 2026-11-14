import { JsonLd } from '@/components/JsonLd'
import { ProductCard } from '@/components/ProductCard'
import { site } from '@/content/site'
import { cms } from '@/lib/cms'
import { businessJsonLd, hasIkigai } from '@/lib/seo'

export const revalidate = 300

const tel = (phone: string) => `tel:${phone.replace(/\s/g, '')}`
const WORDS = ['spokój', 'oddech', 'uziemienie', 'regeneracja', 'witalność']

export default async function HomePage() {
  const products = await cms.getProducts()
  const { hero, about, method, ikigai, offer, booking, contact, faq } = site

  return (
    <>
      <JsonLd data={businessJsonLd()} />
      <section className="hero" id="start">
        <div className="hero-text">
          <p className="eyebrow">{site.tagline}</p>
          <h1>{hero.title}</h1>
          <p className="lead">{hero.lead}</p>
          <div className="actions">
            {hero.buttons
              .filter((b) => hasIkigai || b.href !== '#ikigai')
              .map((b) => (
                <a key={b.href} href={b.href} className="btn btn-outline">
                  {b.label}
                </a>
              ))}
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="arch">
            <div className="words">
              {WORDS.map((w, i) => (
                <span key={w} style={{ animationDelay: `${i * 3}s` }}>
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="o-mnie" className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">O mnie</p>
            <h2>{about.title}</h2>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <aside className="panel">
            <h3>{about.workspace.title}</h3>
            <p>{about.workspace.text}</p>
            <p className="muted" style={{ whiteSpace: 'pre-line' }}>
              {contact.address}
            </p>
            <p className="muted">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <br />
              {contact.phones.map((p, i) => (
                <span key={p}>
                  {i > 0 && ' / '}
                  <a href={tel(p)}>{p}</a>
                </span>
              ))}
            </p>
          </aside>
        </div>
      </section>

      <section id="metoda" className="section alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Metoda</p>
            <h2>{method.title}</h2>
            <p className="lead">{method.lead}</p>
          </div>
          <ol className="pillars">
            {method.pillars.map((p, i) => (
              <li key={p.title}>
                <span className="pillar-no">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {hasIkigai && (
        <section id="ikigai" className="section">
          <div className="container narrow center">
            <p className="eyebrow">Odkryj swoje</p>
            <h2>{ikigai.title}</h2>
            <p className="lead">{ikigai.text}</p>
          </div>
        </section>
      )}

      <section id="oferta" className="section alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Sklep</p>
            <h2>{offer.title}</h2>
          </div>
          <div className="grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="container narrow">
          <p className="eyebrow">FAQ</p>
          <h2>{faq.title}</h2>
          <div className="faq">
            {faq.items.map((f) => (
              <details key={f.q}>
                <summary>
                  <h3>{f.q}</h3>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="wizyta" className="section alt">
        <div className="container narrow center">
          <p className="eyebrow">Kontakt</p>
          <h2>{booking.title}</h2>
          <p>{booking.text}</p>
          <p className="big-phone">
            <a href={tel(contact.bookingPhone)}>{contact.bookingPhone}</a>
          </p>
          <p className="muted">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>
      </section>
    </>
  )
}
