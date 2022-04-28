export type News = {
  id: string
  title: string
  image: {
    url: string
    blurDataUrl: string
  } | null
  slug: string
  category: {
    name: string
    slug: string
  }
  date: string
  published: boolean
  body: string
}
