import Image from 'next/image'
import Link from 'next/link'

import { GetAllNewsQuery, useGetAllNewsQuery } from '../../generated'
import { graphQLClient } from '../../services/graphQLClient'

type HomeProps = {
  previewToken: string
} & GetAllNewsQuery

export function Home(props: HomeProps) {
  const { data } = useGetAllNewsQuery(
    graphQLClient,
    undefined,
    { initialData: { allNews: props.allNews } },
    { preview: props.previewToken }
  )

  const allNews = data?.allNews

  return (
    <div>
      <h1>Hello {allNews?.length}</h1>

      <Link href="/dash">
        <a>Dash</a>
      </Link>

      <ul>
        {allNews?.map(news => (
          <li key={news.id}>
            <h2>
              <Link href={`/news/${news.slug}`}>
                <a>
                  {news.title} {!news.published && <>- Draft</>}
                </a>
              </Link>
            </h2>

            <p>
              <Link href={`/categories/${news.category.slug}`}>
                <a>Category: {news.category.name}</a>
              </Link>
            </p>

            {news.image && (
              <Image
                src={news.image.url}
                alt={news.title}
                width={300}
                height={200}
                placeholder="blur"
                blurDataURL={news.image.blurDataUrl}
                objectFit="cover"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
