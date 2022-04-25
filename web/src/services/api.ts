import { gql, GraphQLClient } from 'graphql-request'

const endpoint = 'http://localhost:3010/graphql'
const jwt =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbDJjcTZjNncwMDAyM2Vxb2xkaDJtdWJhIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjUwODIxMzY1LCJleHAiOjE2NTIxMTczNjV9.M3pyYnXioUJXQeoLCz3a6_WA5iutntk9YWxdsLSJd5M'

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: jwt
  }
})

const api = <T>(query: string, variables?: any) => graphQLClient.request<T>(query, variables)

export { api, gql }
