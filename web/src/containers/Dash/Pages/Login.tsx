import { ClientError } from 'graphql-request'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import { useCreateSessionMutation } from '../../../generated'
import { useSession } from '../../../hooks/useSession'
import { graphQLClient } from '../../../services/graphQLClient'

export function Login() {
  const { push } = useRouter()
  const [hasError, setHasError] = useState('')
  const { mutateAsync, isLoading } = useCreateSessionMutation(graphQLClient)
  const { setSession } = useSession()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setHasError('')

    try {
      const { createSession } = await mutateAsync({
        createSessionInput: {
          email: e.currentTarget.email.value,
          password: e.currentTarget.password.value
        }
      })

      setSession(createSession)
      push('/dash')
    } catch (error) {
      if (error instanceof ClientError) {
        if (error?.response?.errors?.[0].message === 'Invalid credentials') {
          setHasError('Invalid email or password')
        } else setHasError('An error has occurred')
      }
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}
      >
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading' : 'Submit'}
        </button>
        {hasError && <p>{hasError}</p>}
      </form>
    </div>
  )
}
