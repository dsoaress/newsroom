import { Layout } from '@/components/Layout'
import { GetCategoryBySlugQuery, useGetCategoryBySlugQuery } from '@/generated'
import { graphQLClient } from '@/services/graphQLClient'

type CategoryItemProps = {
  slug: string
} & GetCategoryBySlugQuery

export function CategoryItem(props: CategoryItemProps) {
  const { data } = useGetCategoryBySlugQuery(
    graphQLClient,
    { slug: props.slug },
    { initialData: { category: props.category } }
  )

  const category = data?.category

  return (
    <Layout>
      <h1>{category?.name}</h1>
    </Layout>
  )
}
