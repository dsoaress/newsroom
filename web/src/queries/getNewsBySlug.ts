import { gql } from 'urql'

export const GET_NEWS_BY_SLUG = gql`
  query GetNewsById($slug: String!) {
    news(slug: $slug) {
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
      body
    }
  }
`
