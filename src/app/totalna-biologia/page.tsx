import { TopicPage } from '@/components/TopicPage'
import { getTopic } from '@/content/topics'
import { pageMetadata } from '@/lib/seo'

const topic = getTopic('totalna-biologia')

export const metadata = pageMetadata({ title: topic.seoTitle, description: topic.description, path: '/totalna-biologia' })

export default function Page() {
  return <TopicPage topic={topic} />
}
