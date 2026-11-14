import Link from 'next/link'
import type { Crumb } from '@/lib/seo'

type Props = { eyebrow?: string; title: React.ReactNode; lead?: string; crumbs?: Crumb[] }

export function PageHeader({ eyebrow, title, lead, crumbs }: Props) {
  return (
    <header className="page-header">
      <div className="container">
        {crumbs && (
          <nav aria-label="Okruszki" className="crumbs">
            <Link href="/">Strona główna</Link>
            {crumbs.map((c, i) =>
              i === crumbs.length - 1 ? (
                <span key={c.path} aria-current="page">
                  {c.name}
                </span>
              ) : (
                <Link key={c.path} href={c.path}>
                  {c.name}
                </Link>
              ),
            )}
          </nav>
        )}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </header>
  )
}
