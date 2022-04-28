export type News = {
  id: string
  title: string
  image: {
    url: string
  } | null
  slug: string
  category: {
    name: string
  }
  date: string
  published: boolean
  body: string
}
