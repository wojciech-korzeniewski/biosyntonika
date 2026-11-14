import type { Page, Product } from '@/lib/cms/types'

/**
 * Tymczasowe dane – do czasu podpięcia CMS-a.
 * Po wyborze CMS-a ten plik znika, a dane przychodzą z jego API.
 */

export const products: Product[] = [
  {
    id: 'sesja-1-1',
    slug: 'sesja-1-1',
    title: 'BioSyntonika™ Sesja 1:1',
    price: 500,
    compareAtPrice: 600,
    currency: 'PLN',
    shortDescriptionHtml: '<p>Indywidualna sesja ok. 120 minut – online lub stacjonarnie.</p>',
    descriptionHtml:
      '<p>Indywidualna sesja BioSyntonika™ trwająca około 120 minut.</p>' +
      '<p>Online (WhatsApp, Messenger, FaceTime) lub stacjonarnie w Bydgoszczy i Szklarskiej Porębie.</p>',
    categories: [{ slug: 'sesje', name: 'Sesje' }],
    purchasable: true,
  },
  {
    id: 'warsztaty-praca-z-anhedonia',
    slug: 'warsztaty-praca-z-anhedonia',
    title: 'Warsztaty – praca z anhedonią',
    price: 500,
    compareAtPrice: 550,
    currency: 'PLN',
    shortDescriptionHtml: '<p>Warsztaty grupowe do 8 osób – stacjonarne (1 dzień) lub w plenerze (2 dni).</p>',
    descriptionHtml:
      '<p>Warsztaty grupowe BioSyntonika™ poświęcone pracy z anhedonią.</p>' +
      '<p>Maksymalnie 8 osób. Stacjonarnie 1 dzień, w plenerze 2 dni.</p>',
    categories: [{ slug: 'warsztaty', name: 'Warsztaty' }],
    purchasable: true,
  },
]

export const pages: Page[] = [
  { slug: 'regulamin', title: 'Regulamin', html: '<p>Treść do uzupełnienia.</p>' },
  { slug: 'zwroty', title: 'Polityka zwrotów', html: '<p>Treść do uzupełnienia.</p>' },
  { slug: 'polityka-prywatnosci', title: 'Polityka prywatności', html: '<p>Treść do uzupełnienia.</p>' },
]
