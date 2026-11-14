import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
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
  if (!product) return {}
  return {
    title: product.title,
    openGraph: product.images[0] ? { images: [product.images[0].url] } : undefined,
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await cms.getProduct((await params).slug)
  if (!product) notFound()
  const [main, ...rest] = product.images

  return (
    <article className="container product">
      <div className="product-gallery">
        {[main, ...rest].filter(Boolean).map((img, i) => (
          <Image
            key={img.url}
            src={img.url}
            alt={img.alt}
            width={img.width ?? 1200}
            height={img.height ?? 1200}
            sizes="(max-width: 900px) 100vw, 50vw"
            priority={i === 0}
          />
        ))}
      </div>
      <div className="product-info">
        <p className="eyebrow">
          <Link href="/#oferta">Oferta</Link>
          {product.categories[0] && <> · {product.categories[0].name}</>}
        </p>
        <h1>{product.title}</h1>
        <Price product={product} />
        {product.purchasable ? (
          <a href={cms.getCheckoutUrl(product)} className="btn btn-solid">
            Kupuję
          </a>
        ) : (
          <p className="muted">Obecnie niedostępne.</p>
        )}
        {product.descriptionHtml && (
          <div className="prose" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        )}
      </div>
    </article>
  )
}
