import { CtaBox } from '@/components/CtaBox'
import { Faq } from '@/components/Faq'
import { JsonLd } from '@/components/JsonLd'
import { PageHeader } from '@/components/PageHeader'
import { site } from '@/content/site'
import { pageMetadata, webPageJsonLd } from '@/lib/seo'

const { faq } = site
const path = '/faq'
const crumbs = [{ name: 'FAQ', path }]

export const metadata = pageMetadata({ title: faq.seoTitle, description: faq.description, path })

export default function FaqPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path, title: faq.title, description: faq.description, crumbs })} />
      <PageHeader eyebrow="FAQ" title={faq.title} crumbs={crumbs} />
      <section className="section">
        <div className="container narrow">
          <Faq items={faq.items} />
          <CtaBox text="Nie znalazłaś/eś odpowiedzi? Zadzwoń – chętnie odpowiem na pytania." />
        </div>
      </section>
    </>
  )
}
