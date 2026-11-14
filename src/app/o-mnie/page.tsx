import Link from 'next/link'
import { CtaBox } from '@/components/CtaBox'
import { JsonLd } from '@/components/JsonLd'
import { PageHeader } from '@/components/PageHeader'
import { site } from '@/content/site'
import { topics } from '@/content/topics'
import { pageMetadata, webPageJsonLd } from '@/lib/seo'

const { about, contact } = site
const path = '/o-mnie'
const crumbs = [{ name: 'O mnie', path }]

export const metadata = pageMetadata({ title: about.seoTitle, description: about.description, path })

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({ path, title: about.title, description: about.description, crumbs, type: 'AboutPage' })}
      />
      <PageHeader eyebrow="O mnie" title={site.owner} lead={site.ownerTitles.join(' · ')} crumbs={crumbs} />
      <section className="section">
        <div className="container split">
          <div className="prose">
            <h2>{about.title}</h2>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <h2>Czym się zajmuję</h2>
            <ul>
              <li>
                <Link href="/metoda">Autorska metoda BioSyntonika™</Link> – system pracy łączący kilka uzupełniających się
                podejść.
              </li>
              {topics.map((t) => (
                <li key={t.slug}>
                  <Link href={`/${t.slug}`}>{t.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/ikigai">Trener IKIGAI</Link> – praca z sensem, celem i kierunkiem życia.
              </li>
            </ul>
          </div>
          <aside className="panel">
            <h3>{about.workspace.title}</h3>
            <p>{about.workspace.text}</p>
            <p className="muted" style={{ whiteSpace: 'pre-line' }}>
              {contact.address}
            </p>
            <p>
              <Link href="/kontakt">Dojazd i rezerwacja →</Link>
            </p>
          </aside>
        </div>
        <div className="container narrow">
          <CtaBox />
        </div>
      </section>
    </>
  )
}
