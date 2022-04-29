import create from 'zustand'

import { graphQLClient } from '../services/graphQLClient'
import { clearTokens, setTokens } from '../utils/storage'

type User = {
  id: string
  name: string
  email: string
  role: string
}

type SetSession = {
  user: User
  accessToken: string
  refreshToken: string
}

type Session = {
  isLoading: boolean
  isAuthenticated: boolean
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  setIsLoading: (isLoading: boolean) => void
  setSession: (data: SetSession) => void
  clearSession: (push: (url: string) => Promise<boolean>) => void
}

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null
}

export const useSession = create<Session>(set => ({
  ...initialState,

  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  setSession: ({ accessToken, refreshToken, user }: SetSession) => {
    set({
      isAuthenticated: !!accessToken,
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken
    })

    setTokens({
      accessToken: accessToken,
      refreshToken: refreshToken
    })

    graphQLClient.setHeader('authorization', `Bearer ${accessToken}`)
  },

  clearSession: push => {
    set(initialState)
    clearTokens()
    push('/')

    graphQLClient.setHeader('authorization', '')
  }
}))
