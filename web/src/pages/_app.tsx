import { AppProps } from 'next/app'

import { PreviewModeBanner } from '../components/PreviewModeBanner'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PreviewModeBanner />
      <Component {...pageProps} />
    </>
  )
}
