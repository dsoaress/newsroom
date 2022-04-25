export type AllNews = {
  allNews: {
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
  }[]
}

export function Home({ allNews }: AllNews) {
  console.log(allNews)

  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}
