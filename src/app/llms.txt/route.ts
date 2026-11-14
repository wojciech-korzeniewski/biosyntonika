import { site } from '@/content/site'
import { cms } from '@/lib/cms'
import { abs, stripHtml } from '@/lib/seo'
import { formatPrice } from '@/lib/format'

export const dynamic = 'force-static'

/** /llms.txt – zwięzły opis strony dla modeli AI (https://llmstxt.org). */
export async function GET() {
  const products = await cms.getProducts()
  const { contact } = site
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.owner} – ${site.ownerTitles.join(', ')}. ${stripHtml(site.about.paragraphs[0])}`,
    '',
    '## Oferta',
    ...products.map(
      (p) =>
        `- [${p.title}](${abs(`/oferta/${p.slug}`)}): ${p.seoDescription ?? stripHtml(p.shortDescriptionHtml)} Cena: ${formatPrice(p.price, p.currency)}.`,
    ),
    '',
    '## Metoda BioSyntonika™',
    site.method.lead,
    ...site.method.pillars.map((p) => `- ${p.title}: ${p.text}`),
    '',
    '## FAQ',
    ...site.faq.items.flatMap((f) => [`### ${f.q}`, f.a, '']),
    '## Kontakt',
    `- Adres: ${contact.address.replace('\n', ', ')}`,
    `- Telefon: ${contact.phones.join(', ')}`,
    `- E-mail: ${contact.email}`,
    `- Obszar: ${contact.areaServed.join(', ')}`,
    '',
    `Uwaga: ${site.disclaimer}`,
    '',
  ]
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
