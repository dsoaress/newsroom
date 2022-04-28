import { gql } from 'urql'

export const GET_ALL_NEWS = gql`
  query GetAllNews {
    allNews {
      id
      title
      image {
        url
        blurDataUrl
      }
      slug
      category {
        name
        slug
      }
      date
      published
    }
  }
`
