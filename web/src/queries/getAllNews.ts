import { gql } from 'urql'

export const GET_ALL_NEWS = gql`
  query GetAllNews {
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
`
