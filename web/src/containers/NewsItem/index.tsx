import { Layout } from '@/components/Layout'
import { GetNewsBySlugQuery, useGetNewsBySlugQuery } from '@/generated'
import { graphQLClient } from '@/services/graphQLClient'

type NewsItemProps = {
  slug: string
  previewToken: string
} & GetNewsBySlugQuery

export function NewsItem(props: NewsItemProps) {
  const { data } = useGetNewsBySlugQuery(
    graphQLClient,
    { slug: props.slug, preview: !!props.previewToken },
    { initialData: { news: props.news } },
    { preview: props.previewToken }
  )

  const news = data?.news

  return (
    <Layout>
      <h1>{news?.title}</h1>
    </Layout>
  )
}
