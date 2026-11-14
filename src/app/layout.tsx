import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { site } from '@/content/site'
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
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  title: { default: `${site.name} – ${site.owner}`, template: `%s – ${site.name}` },
  description: site.description,
}

const tel = (phone: string) => `tel:${phone.replace(/\s/g, '')}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { contact } = site
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
            <nav aria-label="Menu główne">
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
              <Link href={site.navCta.href} className="btn btn-outline btn-sm">
                {site.navCta.label}
              </Link>
            </nav>
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
              <p className="eyebrow">Informacje</p>
              <p><Link href="/regulamin">Regulamin</Link></p>
              <p><Link href="/zwroty">Polityka zwrotów</Link></p>
              <p><Link href="/polityka-prywatnosci">Polityka prywatności</Link></p>
            </div>
          </div>
          <div className="container footer-bottom">
            © {new Date().getFullYear()} {site.name}
          </div>
        </footer>
      </body>
    </html>
  )
}
