import { ProductCard } from '@/components/ProductCard'
import { site } from '@/content/site'
import { cms } from '@/lib/cms'

export const revalidate = 300

export default async function HomePage() {
  const products = await cms.getProducts()

  return (
    <>
      <section className="hero">
        <div className="hero-inner container">
          <h1>{site.hero.title}</h1>
          <p>{site.hero.subtitle}</p>
          <a href="#oferta" className="button">
            Zobacz ofertę
          </a>
        </div>
      </section>

      {site.sections.map((s, i) => (
        <section key={s.anchor} id={s.anchor} className={`section ${i % 2 ? 'alt' : ''}`}>
          <div className="container narrow">
            <h2>{s.title}</h2>
            <div className="prose" dangerouslySetInnerHTML={{ __html: s.html }} />
          </div>
        </section>
      ))}

      <section id="oferta" className="section">
        <div className="container">
          <h2>{site.offerTitle}</h2>
          <div className="grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="section alt">
        <div className="container narrow">
          <h2>{site.contactTitle}</h2>
          <div className="prose" dangerouslySetInnerHTML={{ __html: site.contactHtml }} />
          <ul className="contact">
            <li>
              Telefon: <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
            </li>
            <li>
              E-mail: <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li style={{ whiteSpace: 'pre-line' }}>{site.address}</li>
          </ul>
        </div>
      </section>
    </>
  )
}
