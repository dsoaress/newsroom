import type { AxiosError } from 'axios'
import axios from 'axios'
import type { NextPageContext, PreviewData } from 'next'
import nookies from 'nookies'

let isRefreshing = false
let failedRequestsQueued: any[] = []

const endpoint = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3010/graphql'
const gql = String.raw

function setupAPIClient(ctx?: NextPageContext) {
  axios.interceptors.response.use(
    response => response,
    error => {
      const { refreshToken } = nookies.get(ctx)

      if (error.response?.status === 401 && !!refreshToken) {
        const originalConfig = error.config

        if (!isRefreshing) {
          isRefreshing = true

          axios
            .post<{
              refreshToken: string
              accessToken: string
            }>(endpoint, {
              query: gql`
                mutation ($refreshToken: String!) {
                  updateSession(refreshToken: $refreshToken) {
                    accessToken
                    refreshToken
                  }
                }
              `,
              variables: {
                refreshToken
              }
            })
            .then(({ data }) => {
              const { accessToken, refreshToken } = data

              nookies.set(ctx, 'accessToken', accessToken, {
                maxAge: 24 * 60 * 60, // 1 day
                path: '/'
              })

              nookies.set(ctx, 'refreshToken', refreshToken, {
                maxAge: 30 * 24 * 60 * 60, // 30 days
                path: '/'
              })

              failedRequestsQueued.forEach(request => request.onSuccess(accessToken))
              failedRequestsQueued = []
            })
            .catch(error => {
              nookies.destroy(ctx, 'accessToken')
              nookies.destroy(ctx, 'refreshToken')
              failedRequestsQueued.forEach(request => request.onFailure(error))
              failedRequestsQueued = []
            })
            .finally(() => (isRefreshing = false))
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueued.push({
            onSuccess: (newAccessToken: string) => {
              originalConfig.headers.authorization = `Bearer ${newAccessToken}`
              resolve(api(originalConfig))
            },
            onFailure: (error: AxiosError) => reject(error)
          })
        })
      }

      return Promise.reject(error)
    }
  )

  return axios
}

type Api = {
  query: string
  variables?: { [key: string]: string | number | boolean }
  preview?: boolean
  previewToken?: PreviewData
  ctx?: NextPageContext
}

async function api<T>({ query, variables, preview, previewToken, ctx }: Api) {
  const apiClient = setupAPIClient(ctx)
  const { accessToken } = nookies.get(ctx)

  const { data } = await apiClient.post<{ data: T }>(endpoint, {
    query,
    variables,
    config: {
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : '',
        preview: preview && previewToken ? previewToken : ''
      }
    }
  })

  return data.data
}

export { api, gql }
