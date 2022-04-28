import { gql } from 'urql'

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories {
      id
      name
      description
      slug
    }
  }
`
