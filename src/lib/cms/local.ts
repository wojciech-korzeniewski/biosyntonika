import { pages, products } from '@/content/data'
import type { CmsAdapter } from './types'

/** Adapter tymczasowy: dane z src/content/data.ts. Zakup jeszcze nieaktywny. */
export const local: CmsAdapter = {
  async getProducts() {
    return products
  },
  async getProduct(slug) {
    return products.find((p) => p.slug === slug) ?? null
  },
  async getPage(slug) {
    return pages.find((p) => p.slug === slug) ?? null
  },
  getCheckoutUrl() {
    return '/#kontakt'
  },
}
