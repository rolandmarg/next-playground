import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

import '../styles/tailwind.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export default function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps

  return (
    <Provider options={{ site: process.env.SITE_URL }} session={session}>
      <Component {...pageProps} />
    </Provider>
  )
}
