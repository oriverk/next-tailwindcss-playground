import { AppProps } from 'next/app'

import '../style/bundle.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}