import { PreviewData } from 'next'
import { createClient, TypedDocumentNode } from 'urql'

export const graphqlClient = async <T>({
  query,
  variables = {},
  previewToken
}: {
  query: string | TypedDocumentNode
  variables?: { [key: string]: string | number | boolean }
  previewToken?: PreviewData
}) => {
  const endpoint = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3010/graphql'
  const urqlClient = createClient({ url: endpoint })
  const { data, error } = await urqlClient
    .query<T>(query, variables, {
      fetchOptions: () => {
        return {
          headers: {
            preview: previewToken?.toString() || ''
          }
        }
      }
    })
    .toPromise()

  if (error) console.log(error.message)
  return data
}
