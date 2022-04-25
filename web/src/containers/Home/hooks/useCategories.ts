import { useQuery } from 'react-query'

import { api, gql } from '../../../services/api'

type Category = {
  id: string
  name: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string
}

async function getCategories() {
  const { categories } = await api<{ categories: Category[] }>(gql`
    query {
      categories {
        id
        name
        description
        slug
        createdAt
        updatedAt
      }
    }
  `)

  return categories
}

export function useCategories() {
  return useQuery<Category[]>('categories', getCategories)
}
