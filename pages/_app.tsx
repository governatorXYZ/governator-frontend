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
import RouteGuard from 'components/RouteGuard'
import 'styles/shield.css';
import { init, Web3OnboardProvider } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import coinbaseModule from '@web3-onboard/coinbase';
import walletConnectModule from '@web3-onboard/walletconnect';
import { Provider } from 'jotai'

const wcV2InitOptions = {
  version: 2 as const,
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: process.env.NEXT_PUBLIC_WC_ID ? process.env.NEXT_PUBLIC_WC_ID : '',
  /**
   * Optional function to handle WalletConnect URI when it becomes available
   */
  // handleUri: (uri: string) => console.log(uri),
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  requiredChains: [1]
}

const injected = injectedModule();
const coinbase = coinbaseModule({ darkMode: true });
const walletConnect = walletConnectModule(wcV2InitOptions);

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
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL ? process.env.NEXT_PUBLIC_RPC_URL : 'https://rpc.ankr.com/eth',
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

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <Provider>
      <ChakraProvider theme={theme}>
        <Web3OnboardProvider web3Onboard={web3Onboard}>
          <NavBar />
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </Web3OnboardProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
