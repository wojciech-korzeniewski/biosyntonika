import Link from 'next/link'
import { CtaBox } from '@/components/CtaBox'
import { JsonLd } from '@/components/JsonLd'
import { PageHeader } from '@/components/PageHeader'
import { site } from '@/content/site'
import { pageMetadata, webPageJsonLd } from '@/lib/seo'

const { method } = site
const path = '/metoda'
const crumbs = [{ name: 'Metoda', path }]

export const metadata = pageMetadata({ title: method.seoTitle, description: method.description, path })

export default function MethodPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path, title: method.title, description: method.description, crumbs })} />
      <PageHeader eyebrow="Metoda" title={method.title} lead={method.lead} crumbs={crumbs} />
      <section className="section">
        <div className="container">
          <ol className="pillars">
            {method.pillars.map((p, i) => (
              <li key={p.slug} id={p.slug}>
                <span className="pillar-no">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="h3">{p.title}</h2>
                <p>{p.text}</p>
                {p.href && (
                  <Link href={p.href} className="more">
                    Czytaj więcej →
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
        <div className="container narrow">
          <CtaBox productHref="/oferta" />
        </div>
      </section>
    </>
  )
}
