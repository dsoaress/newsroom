import { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { PreviewModeBanner } from '../components/PreviewModeBanner'
import { queryClient } from '../services/queryClient'
import { globalStyles } from '../styles'

export default function App({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <QueryClientProvider client={queryClient}>
      <PreviewModeBanner />
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
