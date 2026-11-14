import Image from 'next/image'
import { CtaBox } from '@/components/CtaBox'
import { IkigaiDiagram } from '@/components/IkigaiDiagram'
import { IkigaiTrainer } from '@/components/IkigaiTrainer'
import { JsonLd } from '@/components/JsonLd'
import { ikigaiPage as page } from '@/content/ikigai'
import { pageMetadata, webPageJsonLd } from '@/lib/seo'

const path = '/ikigai'
const crumbs = [{ name: 'IKIGAI', path }]

export const metadata = pageMetadata({ title: page.seoTitle, description: page.description, path })

export default function IkigaiPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({ path, title: page.title, description: page.description, crumbs })}
      />
      <section className="section ikigai">
        <div className="container">
          <div className="ikigai-shell">
            <div className="ikigai-head">
              <div className="ikigai-head-brand">
                <Image
                  src="/images/ikigai-symbol.png"
                  alt=""
                  width={44}
                  height={56}
                  className="ikigai-symbol"
                />
                <div>
                  <p className="ikigai-brand">IKIGAI</p>
                  <p className="ikigai-brand-sub">Trener IKIGAI · BioSyntonika™</p>
                </div>
              </div>
            </div>
            <div className="ikigai-grid">
              <div>
                <p className="eyebrow">{page.eyebrow}</p>
                <h1>
                  {page.title}
                  <br />
                  {page.titleLine2}
                </h1>
                <div className="ikigai-quote">
                  <p>
                    <strong>{page.origin.heading}</strong>
                    <br />
                    <span className="kanji-inline" lang="ja">
                      {page.origin.kanji}
                    </span>{' '}
                    {page.origin.text}
                  </p>
                  <p>
                    <strong>{page.purpose.heading}</strong> {page.purpose.text}
                  </p>
                </div>
                <p className="lead">{page.process}</p>
                <ul className="rules">
                  {page.rules.map((r) => (
                    <li key={r.tag}>
                      <span>{r.tag}</span>
                      {r.text}
                    </li>
                  ))}
                </ul>
                <IkigaiTrainer />
              </div>
              <div className="ikigai-side">
                <IkigaiDiagram />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container narrow prose">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </section>
          ))}
        </div>
        <div className="container narrow">
          <CtaBox
            title="Sesja z trenerem IKIGAI"
            text="Chcesz omówić swoją mapę ikigai i ułożyć plan działania? Umów sesję – stacjonarnie w Bydgoszczy lub online."
          />
        </div>
      </section>
    </>
  )
}
