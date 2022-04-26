import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import type { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
import type { NextPageContext } from 'next'
import nookies from 'nookies'

let isRefreshing = false
let failedRequestsQueued: any[] = []

const endpoint = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3010/graphql'

function setupAPIClient(ctx?: NextPageContext) {
  const { accessToken } = nookies.get(ctx)

  const api = axios.create({
    headers: { Authorization: accessToken ? `Bearer ${accessToken}` : '' }
  })

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const { accessToken } = nookies.get(ctx)

    if (config.headers) {
      config.headers['Authorization'] = accessToken ? `Bearer ${accessToken}` : ''
    }

    return config
  })

  api.interceptors.response.use(
    response => response,
    error => {
      const { refreshToken } = nookies.get(ctx)

      if (error.response?.status === 401 && !!refreshToken) {
        const originalConfig = error.config

        if (!isRefreshing) {
          isRefreshing = true

          api
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
              originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`
              resolve(api(originalConfig))
            },
            onFailure: (error: AxiosError) => reject(error)
          })
        })
      }

      return Promise.reject(error)
    }
  )

  return api
}

async function api<T>({
  query,
  variables,
  ctx
}: {
  query: DocumentNode
  variables?: { [key: string]: string | number | boolean | undefined }
  ctx?: NextPageContext
}): Promise<T> {
  const api = setupAPIClient(ctx)

  const { data } = await api.post<{ data: T }>(endpoint, {
    query,
    variables
  })

  return data.data
}

export { api, gql, setupAPIClient }
