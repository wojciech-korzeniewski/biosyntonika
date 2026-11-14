import 'server-only'
import { local } from './local'
import type { CmsAdapter } from './types'

export type { CmsAdapter, CmsImage, Page, Product } from './types'

/**
 * Jedyne miejsce, przez które strona rozmawia z CMS-em.
 * Po wyborze CMS-a: nowy plik z adapterem (np. ./shopify.ts) i podmiana poniżej.
 */
export const cms: CmsAdapter = local
