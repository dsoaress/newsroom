import { useRouter } from 'next/router'
import nookies from 'nookies'
import { useState } from 'react'

import { api, gql } from '../../services/api'

export default function Auth() {
  const { push } = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) return

    try {
      const { createSession } = await api<{
        createSession: {
          accessToken: string
          refreshToken: string
        }
      }>({
        query: gql`
          mutation ($email: String!, $password: String!) {
            createSession(createSessionInput: { email: $email, password: $password }) {
              accessToken
              refreshToken
            }
          }
        `,
        variables: {
          email,
          password
        }
      })

      nookies.set(null, 'accessToken', createSession.accessToken, {
        maxAge: 24 * 60 * 60, // 1 day
        path: '/'
      })

      nookies.set(null, 'refreshToken', createSession.refreshToken, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/'
      })

      push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <div>
        <label style={{ display: 'block' }}>
          Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>

        <label style={{ display: 'block' }}>
          Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>

        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  )
}
