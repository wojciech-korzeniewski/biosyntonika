import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cms } from '@/lib/cms'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await cms.getPage((await params).slug)
  return page ? { title: page.title } : {}
}

export default async function Page({ params }: Props) {
  const page = await cms.getPage((await params).slug)
  if (!page) notFound()
  return (
    <article className="container narrow">
      <h1>{page.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
    </article>
  )
}
