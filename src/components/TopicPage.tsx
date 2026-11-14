import Link from 'next/link'
import { CtaBox } from '@/components/CtaBox'
import { JsonLd } from '@/components/JsonLd'
import { PageHeader } from '@/components/PageHeader'
import type { Topic } from '@/content/topics'
import { topics } from '@/content/topics'
import { webPageJsonLd } from '@/lib/seo'

export function TopicPage({ topic }: { topic: Topic }) {
  const path = `/${topic.slug}`
  const crumbs = [
    { name: 'Metoda', path: '/metoda' },
    { name: topic.name, path },
  ]
  const others = topics.filter((t) => t.slug !== topic.slug)

  return (
    <>
      <JsonLd data={webPageJsonLd({ path, title: topic.title, description: topic.description, crumbs })} />
      <PageHeader eyebrow={topic.eyebrow} title={topic.title} lead={topic.lead} crumbs={crumbs} />
      <article className="section">
        <div className="container narrow prose">
          {topic.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs?.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
              {s.list && (
                <ul>
                  {s.list.map((li) => (
                    <li key={li.slice(0, 32)}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
        <div className="container narrow">
          <CtaBox productHref={`/oferta/${topic.productSlug}`} />
          <nav className="related" aria-label="Powiązane">
            <p className="eyebrow">Zobacz też</p>
            <Link href="/metoda">Metoda BioSyntonika™ – wszystkie filary</Link>
            {others.map((t) => (
              <Link key={t.slug} href={`/${t.slug}`}>
                {t.name}
              </Link>
            ))}
            <Link href="/faq">Najczęstsze pytania</Link>
          </nav>
        </div>
      </article>
    </>
  )
}
