import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Price } from '@/components/ProductCard'
import { cms } from '@/lib/cms'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const products = await cms.getProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await cms.getProduct((await params).slug)
  return product ? { title: product.title } : {}
}

export default async function ProductPage({ params }: Props) {
  const product = await cms.getProduct((await params).slug)
  if (!product) notFound()

  return (
    <article className="container product">
      <div className="product-media">
        {product.image && <img src={product.image.url} alt={product.image.alt} />}
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>
        <Price product={product} />
        {product.shortDescriptionHtml && (
          <div className="prose" dangerouslySetInnerHTML={{ __html: product.shortDescriptionHtml }} />
        )}
        {product.purchasable ? (
          <a href={cms.getCheckoutUrl(product)} className="button">
            Kupuję
          </a>
        ) : (
          <p className="muted">Obecnie niedostępne.</p>
        )}
      </div>
      {product.descriptionHtml && (
        <div className="product-description prose" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
      )}
    </article>
  )
}
