import { TopicPage } from '@/components/TopicPage'
import { getTopic } from '@/content/topics'
import { pageMetadata } from '@/lib/seo'

const topic = getTopic('naturopatia')

export const metadata = pageMetadata({ title: topic.seoTitle, description: topic.description, path: '/naturopatia' })

export default function Page() {
  return <TopicPage topic={topic} />
}
