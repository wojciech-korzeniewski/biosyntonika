/**
 * Wspólny model danych strony – niezależny od CMS-a.
 * Każdy CMS (WooCommerce, Shopify, Payload…) dostaje swój adapter, który mapuje
 * swoje API na te typy. Strona korzysta wyłącznie z interfejsu `CmsAdapter`.
 */

export type CmsImage = {
  url: string
  alt: string
  width?: number
  height?: number
}

export type Product = {
  id: string
  slug: string
  title: string
  /** Cena w głównej jednostce waluty (np. 500 = 500,00 zł). */
  price: number
  /** Cena przed promocją, jeśli produkt jest przeceniony. */
  compareAtPrice?: number
  currency: string
  image?: CmsImage
  /** HTML z CMS-a. */
  shortDescriptionHtml?: string
  descriptionHtml?: string
  categories: { slug: string; name: string }[]
  purchasable: boolean
}

export type Page = {
  slug: string
  title: string
  html: string
}

export interface CmsAdapter {
  getProducts(): Promise<Product[]>
  getProduct(slug: string): Promise<Product | null>
  getPage(slug: string): Promise<Page | null>
  /**
   * Adres, pod który przekierowujemy po kliknięciu „Kup”.
   * Koszyk, płatność i zamówienie obsługuje CMS.
   */
  getCheckoutUrl(product: Product): string
}
