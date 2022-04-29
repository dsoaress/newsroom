import Link from 'next/link'

import { GetCategoryBySlugQuery, useGetCategoryBySlugQuery } from '../../generated'
import { graphQLClient } from '../../services/graphQLClient'

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
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <h1>{category?.name}</h1>
    </div>
  )
}
