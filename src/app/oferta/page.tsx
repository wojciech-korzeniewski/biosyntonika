import { JsonLd } from '@/components/JsonLd'
import { PageHeader } from '@/components/PageHeader'
import { ProductCard } from '@/components/ProductCard'
import { site } from '@/content/site'
import { cms } from '@/lib/cms'
import { abs, pageMetadata, webPageJsonLd } from '@/lib/seo'

const path = '/oferta'
const crumbs = [{ name: 'Oferta', path }]

export const metadata = pageMetadata({ title: site.offer.seoTitle, description: site.offer.description, path })

export default async function OfferPage() {
  const products = await cms.getProducts()
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          path,
          title: site.offer.title,
          description: site.offer.description,
          crumbs,
          type: 'CollectionPage',
          extra: [
            {
              '@type': 'ItemList',
              itemListElement: products.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: abs(`/oferta/${p.slug}`),
                name: p.title,
              })),
            },
          ],
        })}
      />
      <PageHeader eyebrow="Sklep" title={site.offer.title} lead={site.offer.description} crumbs={crumbs} />
      <section className="section">
        <div className="container">
          <div className="grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
