import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import theme from 'config/theme'
import NavBar from 'components/NavBar'

import '@fontsource/noto-sans/400.css'
import '@fontsource/noto-sans/700.css'

import '@fontsource/roboto-mono/400.css'
import '@fontsource/roboto-mono/500.css'
import '@fontsource/roboto-mono/600.css'
import '@fontsource/roboto-mono/700.css'
import '@fontsource/manrope'

import 'styles/shield.css';
import { init, Web3OnboardProvider } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import coinbaseModule from '@web3-onboard/coinbase';
import walletConnectModule from '@web3-onboard/walletconnect';
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { Provider } from 'jotai'

const injected = injectedModule();
const coinbase = coinbaseModule({ darkMode: true });
const walletConnect = walletConnectModule();

const wallets = [
  injected,
  coinbase,
  walletConnect
];

const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL ?? 'https://rpc.ankr.com/eth',
  }
]

const appMetadata = {
  name: 'Governator',
  description: 'Governator',
  logo: "/favicon.ico",
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
  appMetadata,
  theme: 'dark',
  accountCenter: {
    desktop: {
      enabled: false
    },
    mobile: {
      enabled: false
    }
  }
});

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  const layout = getLayout(<Component {...pageProps} />)

  return (
    <Provider>
      <ChakraProvider theme={theme}>
        <Web3OnboardProvider web3Onboard={web3Onboard}>
          {layout}
        </Web3OnboardProvider>
      </ChakraProvider>
    </Provider>
  )
}



export default MyApp
