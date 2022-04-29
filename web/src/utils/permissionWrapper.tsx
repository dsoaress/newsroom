import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { GetProfileDocument, GetProfileQuery } from '../generated'
import { useSession } from '../hooks/useSession'
import { graphQLClient } from '../services/graphQLClient'
import { getTokens } from './storage'

// TODO: refactor this
export function permissionWrapper(Component: any, permissions: string[] | 'guest') {
  function ComponentWithRouterProp({ ...props }) {
    const { asPath, push } = useRouter()
    const { isAuthenticated, isLoading, setIsLoading, setSession, clearSession, user } =
      useSession()

    useEffect(() => {
      const { accessToken, refreshToken } = getTokens()
      if (accessToken) {
        graphQLClient.setHeader('authorization', `Bearer ${accessToken}`)
        graphQLClient
          .request<GetProfileQuery>(GetProfileDocument)
          .then(({ profile }) => {
            setSession({ accessToken, refreshToken, user: profile })
          })
          .catch(() => clearSession(push))
          .finally(() => setIsLoading(false))
      } else setIsLoading(false)
    }, [clearSession, push, setIsLoading, setSession])

    useEffect(() => {
      if (isAuthenticated && permissions === 'guest' && asPath === '/dash/login') {
        push('/dash')
      }

      if (isAuthenticated && permissions?.length && user && !permissions.includes(user.role)) {
        push('/dash')
      }

      if (!isAuthenticated && !isLoading && permissions !== 'guest' && asPath !== '/dash/login') {
        push('/dash/login')
      }
    }, [asPath, isAuthenticated, isLoading, push, user])

    if (isLoading) return null
    return <Component {...props} />
  }

  return ComponentWithRouterProp
}
