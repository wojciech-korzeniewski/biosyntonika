import { ikigaiPage } from '@/content/ikigai/page'
import { site } from '@/content/site'
import { topics } from '@/content/topics'
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
    '## Strony',
    `- [O mnie](${abs('/o-mnie')}): ${site.about.description}`,
    `- [Metoda BioSyntonika™](${abs('/metoda')}): ${site.method.description}`,
    ...topics.map((t) => `- [${t.name}](${abs(`/${t.slug}`)}): ${t.description}`),
    `- [IKIGAI](${abs('/ikigai')}): ${ikigaiPage.description}`,
    `- [FAQ](${abs('/faq')}): ${site.faq.description}`,
    `- [Kontakt](${abs('/kontakt')}): ${site.booking.description}`,
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
