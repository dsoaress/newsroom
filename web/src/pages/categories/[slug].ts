import { GetStaticPaths, GetStaticProps } from 'next'

import { CategoryItem } from '../../containers'
import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetCategoryBySlugDocument,
  GetCategoryBySlugQuery
} from '../../generated'
import { graphQLClient } from '../../services/graphQLClient'

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await graphQLClient.request<GetAllCategoriesQuery>(GetAllCategoriesDocument)

  const paths = data?.categories.map(({ slug }) => ({
    params: { slug }
  }))

  return {
    paths: paths || [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await graphQLClient.request<GetCategoryBySlugQuery>(GetCategoryBySlugDocument, {
    slug: params?.slug as string
  })

  return {
    notFound: !data?.category?.id,
    props: {
      category: data?.category || {},
      slug: data?.category?.slug || ''
    }
  }
}

export default CategoryItem
