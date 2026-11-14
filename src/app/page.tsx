import Link from 'next/link'
import { CtaBox } from '@/components/CtaBox'
import { Faq } from '@/components/Faq'
import { IkigaiDiagram } from '@/components/IkigaiDiagram'
import { JsonLd } from '@/components/JsonLd'
import { ProductCard } from '@/components/ProductCard'
import { ikigaiPage } from '@/content/ikigai'
import { site } from '@/content/site'
import { cms } from '@/lib/cms'
import { businessJsonLd } from '@/lib/seo'

export const revalidate = 300

const WORDS = ['spokój', 'oddech', 'uziemienie', 'regeneracja', 'witalność']

export default async function HomePage() {
  const products = await cms.getProducts()
  const { hero, about, method, offer, faq } = site

  return (
    <>
      <JsonLd data={businessJsonLd()} />
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">{site.tagline}</p>
          <h1>{hero.title}</h1>
          <p className="lead">{hero.lead}</p>
          <div className="actions">
            {hero.buttons.map((b) => (
              <Link key={b.href} href={b.href} className="btn btn-outline">
                {b.label}
              </Link>
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

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">O mnie</p>
            <h2>{about.title}</h2>
            <p>{about.paragraphs[0]}</p>
            <Link href="/o-mnie" className="more">
              Poznaj mnie bliżej →
            </Link>
          </div>
          <aside className="panel">
            <h3>{about.workspace.title}</h3>
            <p>{about.workspace.text}</p>
            <p className="muted" style={{ whiteSpace: 'pre-line' }}>
              {site.contact.address}
            </p>
            <Link href="/kontakt" className="more">
              Dojazd i rezerwacja →
            </Link>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Metoda</p>
            <h2>{method.title}</h2>
            <p className="lead">{method.lead}</p>
          </div>
          <ol className="pillars">
            {method.pillars.map((p, i) => (
              <li key={p.slug}>
                <span className="pillar-no">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <Link href={p.href ?? `/metoda#${p.slug}`} className="more">
                  Czytaj więcej →
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">{ikigaiPage.eyebrow}</p>
            <h2>Odkryj swoje ikigai</h2>
            <p>{ikigaiPage.purpose.text}</p>
            <p className="muted">4 kręgi · 20 pytań · wersje dla dorosłych, młodzieży oraz firm i zespołów.</p>
            <Link href="/ikigai" className="btn btn-outline">
              Rozpocznij ćwiczenie
            </Link>
          </div>
          <IkigaiDiagram className="compact" />
        </div>
      </section>

      <section className="section alt">
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

      <section className="section">
        <div className="container narrow">
          <p className="eyebrow">FAQ</p>
          <h2>{faq.title}</h2>
          <Faq items={faq.items.slice(0, 4)} />
          <p>
            <Link href="/faq" className="more">
              Wszystkie pytania →
            </Link>
          </p>
          <CtaBox />
        </div>
      </section>
    </>
  )
}
