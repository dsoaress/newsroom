import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3010/graphql'

export const graphQLClient = new GraphQLClient(endpoint)
