import { News } from './News'

export type Category = {
  id: string
  name: string
  description: string
  slug: string
  news: News[]
}
