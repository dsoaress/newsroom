import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'

import { graphqlClient } from '../../services/graphqlClient'
import { GET_ALL_NEWS } from '../../services/queries/getAllNews'
import { GET_NEWS_BY_SLUG } from '../../services/queries/getNewsBySlug'
import { News } from '../../types/News'

type NewsItemProps = {
  news: News
}

export default function NewsItem({ news }: NewsItemProps) {
  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <h1>{news?.title}</h1>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await graphqlClient<{ allNews: News[] }>({
    query: GET_ALL_NEWS
  })

  const paths = data?.allNews.map(({ slug }) => ({
    params: { slug }
  }))

  return {
    paths: paths || [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params, previewData: previewToken }) => {
  const data = await graphqlClient<{ news: News }>({
    query: GET_NEWS_BY_SLUG,
    variables: { slug: params?.slug as string },
    previewToken
  })

  return {
    notFound: !data?.news?.id,
    props: {
      news: data?.news || {}
    }
  }
}
