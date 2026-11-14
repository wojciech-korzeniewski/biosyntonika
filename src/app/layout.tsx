import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MobileMenu } from '@/components/MobileMenu'
import { site } from '@/content/site'
import { SITE_URL } from '@/lib/seo'
import './styles.css'

const serif = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  variable: '--font-serif',
})
const sans = Jost({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: site.seoTitle, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.owner }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: site.name,
    title: site.seoTitle,
    description: site.description,
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

const tel = (phone: string) => `tel:${phone.replace(/\s/g, '')}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { contact } = site
  const navItems = site.nav
  return (
    <html lang="pl" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand">
              <Image src={site.logo.url} alt={site.logo.alt} width={72} height={53} priority />
              <span>
                <span className="brand-name">{site.name}</span>
                <span className="brand-owner">{site.owner}</span>
              </span>
            </Link>
            <nav className="desktop-nav" aria-label="Menu główne">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
              <Link href={site.navCta.href} className="btn btn-outline btn-sm">
                {site.navCta.label}
              </Link>
            </nav>
            <MobileMenu items={navItems} cta={site.navCta} />
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container footer-inner">
            <div>
              <p className="brand-name">{site.name}</p>
              <p className="brand-owner">{site.owner}</p>
            </div>
            <div>
              <p className="eyebrow">Kontakt</p>
              <p style={{ whiteSpace: 'pre-line' }}>{contact.address}</p>
              {contact.phones.map((p) => (
                <p key={p}>
                  <a href={tel(p)}>{p}</a>
                </p>
              ))}
              <p>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
            </div>
            <div>
              <p className="eyebrow">Na stronie</p>
              <p><Link href="/metoda">Metoda BioSyntonika™</Link></p>
              <p><Link href="/hipnoterapia-medyczna">Hipnoterapia medyczna</Link></p>
              <p><Link href="/totalna-biologia">Totalna Biologia</Link></p>
              <p><Link href="/naturopatia">Naturopatia</Link></p>
              <p><Link href="/ikigai">IKIGAI</Link></p>
            </div>
            <div>
              <p className="eyebrow">Informacje</p>
              <p><Link href="/faq">FAQ</Link></p>
              <p><Link href="/kontakt">Kontakt</Link></p>
              <p><Link href="/regulamin">Regulamin</Link></p>
              <p><Link href="/zwroty">Polityka zwrotów</Link></p>
              <p><Link href="/polityka-prywatnosci">Polityka prywatności</Link></p>
            </div>
          </div>
          <p className="container disclaimer">{site.disclaimer}</p>
          <div className="container footer-bottom">
            © {new Date().getFullYear()} {site.name}
          </div>
        </footer>
      </body>
    </html>
  )
}
