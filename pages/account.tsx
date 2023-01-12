import type { NextPage } from 'next';
import { useSession } from 'next-auth/react'
import moment from 'moment';
import useSWR from 'swr';
import { useAtom } from 'jotai';
import { userAtom } from 'atoms';
import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  VStack,
  Text,
  Flex,
} from '@chakra-ui/react'

/* Modules */
import { privateBaseAxios, privateBaseFetcher } from '../constants/axios';
import Siwe from '../modules/siwe';

/* UI Components */
import CustomButton from '../components/common/Button';
import DataTable from 'components/Datatable';

/* Types */
import { Address } from '../interfaces';
import { ethers, Wallet } from 'ethers';

/* Config */
import { RPC_URL } from '../config/RPC';

/* Web 3 Onboard */
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets';
import { useConnectWallet } from '@web3-onboard/react';
import { Account, WalletState } from '@web3-onboard/core/dist/types';

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

const onboard = Onboard({
  wallets,
  chains,
  appMetadata,
  accountCenter: {
    desktop: {
      enabled: false
    },
    mobile: {
      enabled: false
    }
  }
});

const columns = [
  {
    Header: 'No.',
    accessor: 'idx',
  },
  {
    Header: 'Address',
    accessor: '_id',
  },
  {
    Header: 'Verified Date',
    accessor: 'verifiedDate',
  },
  {
    Header: 'Actions',
    accessor: 'actions',
  }
]

type AddressesData = {
  idx: number;
  _id: string;
  verifiedDate: string;
  actions: any;
}


const Account: NextPage = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedWalletLabel, setConnectedWalletLabel] = useState('');
  const [verified, setVerified] = useState(false);
  // const [provider, setProvider] = useAtom(providerAtom);

  const [
    {
      wallet,
      connecting,
    }
  ] = useConnectWallet();

  async function connectWallet() {
    try {
      setIsConnecting(true);
      const wallets = await onboard.connectWallet();
      if (!wallets) return;
      const { accounts, label } = wallets[0];
      setConnectedWalletLabel(label);

      if (!accounts) return;
      const { address } = accounts[0];

      const verified = addressesData.find((addressData: any) => addressData._id.toLowerCase() === address).verifiedDate !== 'False';
      setVerified(verified);

      if (!verified) {
        await Siwe.signInWithEthereum(session?.discordId as unknown as string);
        mutate?.();
      }
    } catch (e: unknown) {
      console.error("There was an error", e);
    } finally {
      setIsConnecting(false);
    }
  }

  async function disconnectWallet() {
    try {
      setIsConnecting(true);
      if (!connectedWalletLabel) return;
      const wallets = await onboard.disconnectWallet({
        label: connectedWalletLabel
      });
    } catch (e: unknown) {
      console.error("There was an error", e);
    } finally {
      setIsConnecting(false);
    }
  }

  const { data: session } = useSession()

  const signInWithEthereum = async (): Promise<void> => {
    await Siwe.signInWithEthereum(session?.discordId as unknown as string);
    mutate?.();
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (user.userId === '') await setUser({ userId: (await privateBaseAxios.get(`/user/discord/${session?.discordId}`)).data._id });
    }
    fetchUser().then(() => null)
  },

    //eslint-disable-next-line react-hooks/exhaustive-deps
    [session?.discordId]
  )

  const removeWallet = async (walletAddress: string): Promise<void> => {
    await Siwe.removeWallet(walletAddress)
    mutate?.();
  }

  const useAddressesData = (): any => {
    // user ? ['/api/orders', user] : null, fetchWithUser
    const { data, error, mutate } = useSWR((user?.userId !== '') ? `/account/ethereum/get-by-user-id/${user?.userId}` : null, privateBaseFetcher);
    const rawData = data?.data ? (data?.data) as Address[] : [] as Address[]
    const addressesData = rawData
      // Don't show unverified addresses.
      .map((_address: Address, idx: number) => {
        return {
          idx: idx + 1,
          _id: _address._id,
          verifiedDate: _address.verified ? moment(_address.updatedAt).format('LL') : 'False',
          actions: (
            <Flex
              key={_address._id}
              w='max-content'
              mx='auto'
            >
              <div>
                <CustomButton
                  color='red'
                  text='Remove'
                  onClick={() => removeWallet(_address._id)}
                />
              </div>
            </Flex>
          )
        }
      })

    return { addressesData, error, mutate }
  }

  const { addressesData, error, mutate } = useAddressesData();
  const isLoadingAddresses = !addressesData && !error

  return (
    <Box>
      <Box bg='black' h='100vh' pt='30'>
        <Flex
          justifyContent='center'
          alignItems='center'
          flexDir={'column'}
        >
          <Box
            bg='gray.700'
            p={10}
            mb='32px'
            w='1044px'
          >
            <Flex
              justifyContent='space-between'
            >
              <Text
                color='white'
                fontSize='2xl'
                mb='32px'
              >My Account</Text>
              <Box>
                <Button
                  colorScheme={'purple'}
                  isDisabled={wallet?.provider ? false : true}
                  mr='16px'
                  onClick={() => signInWithEthereum()}
                >{verified ? 'Reverify' : 'Verify'}</Button>
                <Button
                  disabled={connecting}
                  isLoading={connecting}
                  onClick={() => {
                    if (wallet?.provider) {
                      disconnectWallet()
                    } else {
                      connectWallet()
                    }
                  }}
                  colorScheme={wallet?.provider ? 'red' : 'green'}
                >
                  {wallet?.provider ? 'Disconnect' : 'Connect'}
                </Button>
              </Box>
            </Flex>
            {wallet?.provider && (
              <Box color='white'>
                <Text>Wallet used: {wallet.label}</Text>
                <Text>Wallet address: {wallet.accounts[0].address}</Text>
              </Box>
            )}
          </Box>
          {/* Account Details Box */}
          <Box bg='gray.700' p={10}>
            <VStack spacing={10}>
              <Text color='white' fontSize='2xl'>Connected Addresses</Text>
              {/* Render Poll Listings */}
              <DataTable
                data={addressesData.filter((addressData: any) => addressData.verifiedDate !== 'False')}
                columns={columns}
                loading={isLoadingAddresses}
              />
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Account;