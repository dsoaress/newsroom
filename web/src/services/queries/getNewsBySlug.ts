import { gql } from 'urql'

export const GET_NEWS_BY_SLUG = gql`
  query GetNewsBySlug($slug: String!) {
    news(slug: $slug) {
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
      body
    }
  }
`
