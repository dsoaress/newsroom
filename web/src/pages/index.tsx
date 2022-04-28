import { GetStaticProps } from 'next'
import Link from 'next/link'

import { GET_ALL_NEWS } from '../queries/getAllNews'
import { ssrUrqlClient } from '../services/urqlClient'
import { AllNews } from '../types/AllNews'

type HomeProps = {
  allNews: AllNews
}

export default function Home({ allNews }: HomeProps) {
  return (
    <div>
      <h1>Hello</h1>

      <ul>
        {allNews.map(news => (
          <li key={news.id}>
            <Link href={`/news/${news.slug}`}>
              <a>
                <h2>{news.title}</h2>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ previewData: previewToken }) => {
  const data = await ssrUrqlClient<{ allNews: AllNews }>({
    query: GET_ALL_NEWS,
    previewToken
  })

  console.log(data, previewToken)

  return {
    props: {
      allNews: data?.allNews || []
    },
    revalidate: 1
  }
}
