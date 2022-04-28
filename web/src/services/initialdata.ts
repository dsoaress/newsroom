import { existsSync, mkdirSync, writeFileSync } from 'node:fs'

import { Category } from '../types/Category'
import { graphqlClient } from './graphqlClient'
import { GET_ALL_CATEGORIES } from './queries/getAllCategories'

export async function getInitialData() {
  const data = await graphqlClient<{ categories: Category[] }>({
    query: GET_ALL_CATEGORIES
  })

  if (!existsSync('./public')) mkdirSync('./public')
  writeFileSync('./public/initialdata.json', JSON.stringify(data?.categories, null, 2))
}
