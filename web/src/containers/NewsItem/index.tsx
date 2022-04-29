import Link from 'next/link'

import { GetNewsBySlugQuery, useGetNewsBySlugQuery } from '../../generated'
import { graphQLClient } from '../../services/graphQLClient'

type NewsItemProps = {
  slug: string
  previewToken: string
} & GetNewsBySlugQuery

export function NewsItem(props: NewsItemProps) {
  const { data } = useGetNewsBySlugQuery(
    graphQLClient,
    { slug: props.slug },
    { initialData: { news: props.news } },
    { preview: props.previewToken }
  )

  const news = data?.news

  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <h1>{news?.title}</h1>
    </div>
  )
}
