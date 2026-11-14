import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { site } from '@/content/site'
import './styles.css'

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  title: { default: site.name, template: `%s – ${site.name}` },
  description: site.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="logo">
              {site.name}
            </Link>
            <nav>
              {site.sections.map((s) => (
                <Link key={s.anchor} href={`/#${s.anchor}`}>
                  {s.title}
                </Link>
              ))}
              <Link href="/#oferta">{site.offerTitle}</Link>
              <Link href="/#kontakt" className="nav-cta">
                {site.contactTitle}
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container footer-inner">
            <div>
              <strong>{site.name}</strong>
              <p style={{ whiteSpace: 'pre-line' }}>{site.address}</p>
            </div>
            <div>
              <p>{site.phone}</p>
              <p>{site.email}</p>
            </div>
            <div>
              <p><Link href="/regulamin">Regulamin</Link></p>
              <p><Link href="/zwroty">Polityka zwrotów</Link></p>
              <p><Link href="/polityka-prywatnosci">Polityka prywatności</Link></p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
