import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/cms'
import { formatPrice } from '@/lib/format'

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0]
  return (
    <Link href={`/oferta/${product.slug}`} className="card">
      <div className="card-media">
        {image && (
          <Image src={image.url} alt={image.alt} fill sizes="(max-width: 700px) 100vw, 520px" />
        )}
        {product.compareAtPrice && <span className="badge">Promocja</span>}
      </div>
      <div className="card-body">
        <h3>{product.title}</h3>
        {product.shortDescriptionHtml && (
          <div className="card-text" dangerouslySetInnerHTML={{ __html: product.shortDescriptionHtml }} />
        )}
        <div className="card-foot">
          <Price product={product} />
          <span className="more">Szczegóły →</span>
        </div>
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
