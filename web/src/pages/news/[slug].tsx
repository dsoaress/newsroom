import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { GET_ALL_NEWS } from '../../queries/getAllNews'
import { GET_NEWS_BY_SLUG } from '../../queries/getNewsBySlug'
import { ssrUrqlClient } from '../../services/urqlClient'
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
  const data = await ssrUrqlClient<{ allNews: News[] }>({
    query: GET_ALL_NEWS
  })

  const paths = data?.allNews.map(news => ({
    params: { slug: news.slug }
  }))

  return {
    paths: paths || [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview,
  previewData: previewToken
}) => {
  const data = await ssrUrqlClient<{ news: News }>({
    query: GET_NEWS_BY_SLUG,
    variables: { slug: params?.slug as string },
    previewToken
  })

  return {
    notFound: !data?.news?.id,
    props: {
      news: data?.news || {},
      preview: !!preview
    },
    revalidate: 1
  }
}
