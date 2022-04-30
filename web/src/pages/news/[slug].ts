import { GetStaticPaths, GetStaticProps } from 'next'

import { NewsItem } from '../../containers'
import {
  GetAllNewsDocument,
  GetAllNewsQuery,
  GetNewsBySlugDocument,
  GetNewsBySlugQuery
} from '../../generated'
import { graphQLClient } from '../../services/graphQLClient'

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await graphQLClient.request<GetAllNewsQuery>(GetAllNewsDocument)

  const paths = data?.allNews.map(({ slug }) => ({
    params: { slug }
  }))

  return {
    paths: paths || [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params, previewData: previewToken }) => {
  const data = await graphQLClient.request<GetNewsBySlugQuery>(
    GetNewsBySlugDocument,
    { slug: params?.slug as string, preview: !!previewToken },
    { preview: previewToken?.toString() || '' }
  )

  return {
    notFound: !data?.news?.id,
    props: {
      news: data?.news || {},
      slug: data?.news?.slug || '',
      previewToken: previewToken?.toString() || ''
    }
  }
}

export default NewsItem
