import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'

import { graphqlClient } from '../../services/graphqlClient'
import { GET_ALL_CATEGORIES } from '../../services/queries/getAllCategories'
import { GET_CATEGORY_BY_SLUG } from '../../services/queries/getCategoryBySlug'
import { Category } from '../../types/Category'

type CategoryItemProps = {
  category: Category
}

export default function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <h1>{category?.name}</h1>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await graphqlClient<{ categories: Category[] }>({
    query: GET_ALL_CATEGORIES
  })

  const paths = data?.categories.map(({ slug }) => ({
    params: { slug }
  }))

  return {
    paths: paths || [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await graphqlClient<{ category: Category }>({
    query: GET_CATEGORY_BY_SLUG,
    variables: { slug: params?.slug as string }
  })

  return {
    notFound: !data?.category?.id,
    props: {
      category: data?.category || {}
    }
  }
}
