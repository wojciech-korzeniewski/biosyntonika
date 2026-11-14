import Link from 'next/link'
import type { Product } from '@/lib/cms'
import { formatPrice } from '@/lib/format'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/oferta/${product.slug}`} className="card">
      <div className="card-media">
        {product.image && <img src={product.image.url} alt={product.image.alt} loading="lazy" />}
      </div>
      <div className="card-body">
        <h3>{product.title}</h3>
        {product.shortDescriptionHtml && (
          <div className="card-text" dangerouslySetInnerHTML={{ __html: product.shortDescriptionHtml }} />
        )}
        <Price product={product} />
      </div>
    </Link>
  )
}

export function Price({ product }: { product: Product }) {
  return (
    <p className="price">
      {product.compareAtPrice && <s>{formatPrice(product.compareAtPrice, product.currency)}</s>}
      <strong>{formatPrice(product.price, product.currency)}</strong>
    </p>
  )
}
