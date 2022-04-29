enum Tokens {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken'
}

export function setTokens({
  accessToken,
  refreshToken
}: {
  accessToken: string
  refreshToken: string
}) {
  localStorage.setItem(Tokens.ACCESS_TOKEN, accessToken)
  localStorage.setItem(Tokens.REFRESH_TOKEN, refreshToken)
}

export function getTokens() {
  let accessToken = ''
  let refreshToken = ''

  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem(Tokens.ACCESS_TOKEN) || ''
    refreshToken = localStorage.getItem(Tokens.REFRESH_TOKEN) || ''
  }

  return { accessToken, refreshToken }
}

export function clearTokens() {
  localStorage.removeItem(Tokens.ACCESS_TOKEN)
  localStorage.removeItem(Tokens.REFRESH_TOKEN)
}
