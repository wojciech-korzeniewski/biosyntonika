import { TopicPage } from '@/components/TopicPage'
import { getTopic } from '@/content/topics'
import { pageMetadata } from '@/lib/seo'

const topic = getTopic('hipnoterapia-medyczna')

export const metadata = pageMetadata({ title: topic.seoTitle, description: topic.description, path: '/hipnoterapia-medyczna' })

export default function Page() {
  return <TopicPage topic={topic} />
}
