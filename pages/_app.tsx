import { AppProps } from 'next/app'

import '../styles/tailwind.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
