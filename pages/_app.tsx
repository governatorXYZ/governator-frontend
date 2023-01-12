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
import 'styles/shield.css';
import { init, Web3OnboardProvider } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import { RPC_URL } from '../config/RPC';

const injected = injectedModule();

const wallets = [
  injected
]

const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: RPC_URL,
  }
]

const appMetadata = {
  name: 'Governator',
  description: 'Governator',
  icon: "/favicon.ico",
  recommendedInjectedWallets: [
    {
      name: 'MetamMask',
      url: "https://metamask.io/"
    }
  ]
}

const web3Onboard = init({
  wallets,
  chains,
  appMetadata
})

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Web3OnboardProvider web3Onboard={web3Onboard}>
          <NavBar waitlistDisabled={pageProps.waitlistDisabled ?? false} />
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
        </Web3OnboardProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
