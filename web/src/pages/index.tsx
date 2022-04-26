import type { GetStaticProps } from 'next'

import { api, gql } from '../services/api'

type AllNews = {
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

type HomeProps = {
  allNews: AllNews
  preview: boolean
}

export default function Home({ allNews, preview }: HomeProps) {
  console.log(allNews)
  console.log(preview)

  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview, previewData: previewToken }) => {
  const { allNews } = await api<AllNews>({
    query: gql`
      query {
        allNews {
          id
          title
          image {
            url
          }
          slug
          category {
            name
          }
          date
          published
        }
      }
    `,
    preview,
    previewToken
  })

  return {
    props: { allNews, preview: !!preview },
    revalidate: 1
  }
}
