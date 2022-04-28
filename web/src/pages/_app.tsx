import { AppProps } from 'next/app'
import { Provider as UrqlProvider } from 'urql'

import { PreviewModeBanner } from '../components/PreviewModeBanner'
import { urqlClient } from '../services/urqlClient'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider value={urqlClient}>
      <PreviewModeBanner />
      <Component {...pageProps} />
    </UrqlProvider>
  )
}
