import { site } from '@/content/site'
import type { Product } from '@/lib/cms'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/+$/, '')
export const abs = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path}`)

export const stripHtml = (html = '') =>
  html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

/** Skraca tekst do ~max znaków na granicy słowa (meta description). */
export const truncate = (text: string, max = 158) =>
  text.length <= max ? text : `${text.slice(0, text.lastIndexOf(' ', max - 1))}…`

/** Czy sekcja IKIGAI ma treść (pusta = ukryta w menu i na stronie). */
export const hasIkigai = Boolean(site.ikigai.text)

const ORG_ID = `${SITE_URL}/#business`
const PERSON_ID = `${SITE_URL}/#izabela`

export function businessJsonLd() {
  const { contact } = site
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.name,
        inLanguage: 'pl-PL',
        publisher: { '@id': ORG_ID },
      },
      {
        '@type': 'HealthAndBeautyBusiness',
        '@id': ORG_ID,
        name: site.name,
        description: site.description,
        url: SITE_URL,
        logo: abs(site.logo.url),
        image: abs('/opengraph-image'),
        email: contact.email,
        telephone: contact.phones.map((p) => p.replace(/\s/g, '')),
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${contact.street} (I piętro, gab. nr 2)`,
          postalCode: contact.postalCode,
          addressLocality: contact.city,
          addressRegion: contact.region,
          addressCountry: contact.country,
        },
        areaServed: contact.areaServed,
        founder: { '@id': PERSON_ID },
        employee: { '@id': PERSON_ID },
        priceRange: '500–600 zł',
        knowsAbout: site.method.pillars.map((p) => p.title),
        ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: site.owner,
        jobTitle: site.ownerTitles,
        worksFor: { '@id': ORG_ID },
        knowsAbout: ['Naturopatia', 'Hipnoterapia medyczna', 'Totalna Biologia', 'Recall Healing', 'Biologia stresu'],
        url: `${SITE_URL}/#o-mnie`,
      },
    ],
  }
}

export function productJsonLd(product: Product) {
  const url = abs(`/oferta/${product.slug}`)
  const description = product.seoDescription ?? stripHtml(product.shortDescriptionHtml)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: product.title,
        description,
        url,
        image: product.images.map((i) => abs(i.url)),
        serviceType: product.categories[0]?.name,
        provider: { '@id': ORG_ID },
        areaServed: site.contact.areaServed,
        offers: {
          '@type': 'Offer',
          price: product.price.toFixed(2),
          priceCurrency: product.currency,
          availability: product.purchasable ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
          url,
          seller: { '@id': ORG_ID },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Strona główna', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Oferta', item: abs('/#oferta') },
          { '@type': 'ListItem', position: 3, name: product.title, item: url },
        ],
      },
    ],
  }
}
