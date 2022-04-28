import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { graphqlClient } from '../services/graphqlClient'
import { GET_ALL_NEWS } from '../services/queries/getAllNews'
import { AllNews } from '../types/AllNews'

type HomeProps = {
  allNews: AllNews
}

export default function Home({ allNews }: HomeProps) {
  return (
    <div>
      <h1>Hello {allNews.length}</h1>

      <ul>
        {allNews.map(news => (
          <li key={news.id}>
            <Link href={`/news/${news.slug}`}>
              <a>
                <h2>
                  {news.title} {!news.published && <>- Draft</>}
                </h2>
              </a>
            </Link>

            <Link href={`/categories/${news.category.slug}`}>
              <a>
                <p>Category: {news.category.name}</p>
              </a>
            </Link>

            {news.image && (
              <Image
                src={news.image.url}
                width={300}
                height={200}
                objectFit="contain"
                alt={news.title}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ previewData: previewToken }) => {
  const data = await graphqlClient<{ allNews: AllNews }>({
    query: GET_ALL_NEWS,
    previewToken
  })

  return {
    props: {
      allNews: data?.allNews || []
    }
  }
}
