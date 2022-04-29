import { GetStaticProps } from 'next'

import { Home } from '../containers'
import { GetAllNewsDocument, GetAllNewsQuery } from '../generated'
import { graphQLClient } from '../services/graphQLClient'

export const getStaticProps: GetStaticProps = async ({ previewData: previewToken }) => {
  const data = await graphQLClient.request<GetAllNewsQuery>(GetAllNewsDocument, undefined, {
    preview: previewToken?.toString() || ''
  })

  return {
    props: {
      allNews: data?.allNews || [],
      previewToken: previewToken?.toString() || ''
    }
  }
}

export default Home
