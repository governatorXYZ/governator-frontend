import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import theme from 'config/theme'
import NavBar from 'components/NavBar'

import '@fontsource/noto-sans/400.css'
import '@fontsource/noto-sans/700.css'

import '@fontsource/roboto-mono/400.css'
import '@fontsource/roboto-mono/500.css'
import '@fontsource/roboto-mono/600.css'
import '@fontsource/roboto-mono/700.css'
import RouteGuard from 'components/RouteGuard'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <NavBar />
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
