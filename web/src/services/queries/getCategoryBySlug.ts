import { gql } from 'urql'

export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: String!) {
    category(slug: $slug) {
      id
      name
      description
      slug
      news {
        id
        title
        image {
          url
          blurDataUrl
        }
        slug
        date
        published
      }
    }
  }
`
