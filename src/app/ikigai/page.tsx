import { CtaBox } from '@/components/CtaBox'
import { IkigaiApp } from '@/components/ikigai/IkigaiApp'
import { JsonLd } from '@/components/JsonLd'
import { ikigaiPage as page } from '@/content/ikigai/page'
import { abs, pageMetadata, SITE_URL, webPageJsonLd } from '@/lib/seo'

const path = '/ikigai'
const crumbs = [{ name: 'IKIGAI', path }]

export const metadata = pageMetadata({ title: page.seoTitle, description: page.description, path })

export default function IkigaiPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          path,
          title: page.seoTitle,
          description: page.description,
          crumbs,
          extra: [
            {
              '@type': 'WebApplication',
              name: 'Trener IKIGAI',
              url: abs(path),
              applicationCategory: 'LifestyleApplication',
              operatingSystem: 'Web',
              inLanguage: ['pl-PL', 'en'],
              isAccessibleForFree: true,
              provider: { '@id': `${SITE_URL}/#business` },
            },
          ],
        })}
      />
      <section className="section ikigai">
        <div className="container">
          <IkigaiApp />
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
            text="Chcesz omówić swoją mapę ikigai i przepracować blokady? Umów sesję – stacjonarnie w Bydgoszczy lub online."
          />
        </div>
      </section>
    </>
  )
}
