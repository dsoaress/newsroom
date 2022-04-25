import type { GetStaticProps } from 'next'

import type { AllNews } from '../containers/Home'
import { Home } from '../containers/Home'
import { api, gql } from '../services/api'

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const { allNews } = await api<AllNews>(
    gql`
      query ($preview: Boolean) {
        allNews(preview: $preview) {
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
    { preview }
  )

  return {
    props: { allNews },
    revalidate: 1
  }
}

export default Home
