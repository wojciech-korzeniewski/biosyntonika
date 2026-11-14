import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cms } from '@/lib/cms'
import { pageMetadata, stripHtml } from '@/lib/seo'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await cms.getPage((await params).slug)
  if (!page) return {}
  return {
    ...pageMetadata({ title: page.title, description: stripHtml(page.html), path: `/${page.slug}` }),
    robots: page.noindex ? { index: false, follow: true } : undefined,
  }
}

export default async function Page({ params }: Props) {
  const page = await cms.getPage((await params).slug)
  if (!page) notFound()
  return (
    <article className="container narrow page">
      <h1>{page.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
    </article>
  )
}
