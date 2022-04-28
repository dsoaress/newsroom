import { PreviewData } from 'next'
import { createClient, TypedDocumentNode } from 'urql'

const endpoint = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3010/graphql'

export const urqlClient = createClient({
  url: endpoint
})

export const ssrUrqlClient = async <T>({
  query,
  variables = {},
  previewToken
}: {
  query: string | TypedDocumentNode
  variables?: { [key: string]: string | number | boolean }
  previewToken?: PreviewData
}) => {
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

  if (error) throw error
  return data
}
