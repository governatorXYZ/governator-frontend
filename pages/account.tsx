import type { NextPage } from 'next';
import moment from 'moment';
import useSWR from 'swr';
import { useAtom } from 'jotai';
import { ReactElement, useEffect, useState } from 'react';

import {
  Box,
  Button,
  VStack,
  Text,
  Flex,
  useToast,
} from '@chakra-ui/react'

/* Modules */
import { privateBaseFetcher } from '../constants/axios';
import Siwe from '../modules/siwe';

/* UI Components */
import CustomButton from '../components/common/Button';
import DataTable from 'components/Datatable';

/* Types */
import { Address, LoadableWithData } from '../interfaces';
import { useConnectWallet } from '@web3-onboard/react';
import Head from 'next/head';
import { NextPageWithLayout } from './_app';
import { AccountApi } from 'governator-sdk';
import DefaultLayout from 'components/DefaultLayout';
import { writableLoadableAtom } from 'atoms';
import utils from '../constants/utils'

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

// type AddressesData = {
//   idx: number;
//   _id: string;
//   verifiedDate: string;
//   actions: any;
// }

const Account: NextPageWithLayout = () => {
  const [verified, setVerified] = useState(false);
  const [loadable] = useAtom(writableLoadableAtom)

  const toast = useToast();

  const [
    {
      wallet,
      connecting
    },
    connect,
    disconnect,
  ] = useConnectWallet();

  useEffect(() => {
    if (wallet?.provider) {
      const matchingAddress = addressesData.find((addressData: any) => addressData._id.toLowerCase() === wallet?.accounts[0].address)

      if (!matchingAddress) {
        setVerified(false);
        return;
      }

      const verified = matchingAddress?.verifiedDate !== 'False';
      setVerified(verified);
    } else {
      setVerified(false);
    }
  }, [wallet]);

  async function connectWallet() {

    if(!utils.isAuthenticated(loadable)) return;
    try {
      const wallets = await connect();
      if (!wallets) return;
      const { accounts, provider } = wallets[0];

      if (!accounts) return;
      const { address } = accounts[0];
      
      const matchingAddress = addressesData.find((addressData: any) => addressData._id.toLowerCase() === address)

      // no address in db, so add it.
      if (!matchingAddress) {
        await Siwe.createWalletAccount(address, (loadable as LoadableWithData).data.governatorId);
        await mutate?.();
      } else {
        // Check if it is verified.
        const hasBeenVerified = matchingAddress && matchingAddress.verifiedDate !== 'False';
        // if yes, update state.
        setVerified(hasBeenVerified);

        // if not, verify it.
        if (!hasBeenVerified) {
          await Siwe.signInWithEthereum((loadable as LoadableWithData).data.oauthProfile._id, provider, address);
          await mutate?.();
        }
      }
    } catch (e: unknown) {
      console.error("There was an error", e);
    }
  }

  async function disconnectWallet() {
    try {
      if (!wallet?.provider) return;
      await disconnect({
        label: wallet.label
      });
    } catch (e: unknown) {
      console.error("There was an error", e);
    }
  }


  const signInWithEthereum = async (): Promise<void> => {

    if(!utils.isAuthenticated(loadable)) return;
    try {
      if (!wallet) return;
      const { accounts, provider } = wallet;
      const [ account ] = accounts;
      const matchingAddress = addressesData.find((addressData: any) => addressData._id.toLowerCase() === account.address)
  
      // no address in db, so add it.
      if (!matchingAddress && wallet?.accounts[0].address) {
        await Siwe.createWalletAccount(account.address, (loadable as LoadableWithData).data.governatorId);
        // if it's a new wallet, then it's not verified. So set it to false.
        setVerified(false);
        // mutate the data.
        await mutate?.();
      }
  
      const { verified } = await Siwe.signInWithEthereum((loadable as LoadableWithData).data.oauthProfile._id, provider, account.address);
      await mutate?.();
      
      setVerified(verified);
    } catch (e) {
      toast({
        title: 'Error',
        description: (e as Error).message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const removeWallet = async (walletAddress: string): Promise<void> => {
    try {
      await Siwe.removeWallet(walletAddress);
      await mutate?.();
      // if connected wallet is the one being removed, disconnect it.
      if (wallet?.accounts[0].address.toLowerCase() === walletAddress.toLowerCase()) {
        await disconnectWallet();
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: (err as Error).message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const useAddressesData = (): any => {
    // user ? ['/api/orders', user] : null, fetchWithUser
    const { data, error, mutate } = useSWR(utils.isAuthenticated(loadable) ? `/account/ethereum/get-by-user-id/${(loadable as LoadableWithData).data.governatorId}` : null, privateBaseFetcher);
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
      <Head>
        <title>Governator | Account</title>
      </Head>
      <Box bg='black' h='100vh' pt='30'>
        <Flex
          justifyContent='center'
          alignItems='center'
          flexDir={'column'}
        >
          <Box
            bg='gray.700'
            p={{
              base: '2.5rem 1rem',
              md: 10
            }}
            mb='32px'
            w={{
              base: 'calc(100vw - 64px)',
              lg: '1044px'
            }}
          >
            <Flex
              flexDir={{
                base: 'column',
                md: 'row'
              }}
              justifyContent='space-between'
            >
              <Flex
                flexDir='column'
                mb='16px'
              >
                <Text
                  color='white'
                  fontSize='2xl'
                  textAlign={{
                    base: 'center',
                    md: 'unset'
                  }}
                >My Wallet</Text>
                <Text
                  color='white'
                  w='25rem'
                  mx={{
                    base: 'auto',
                    md: 'unset'
                  }}
                  textAlign={{
                    base: 'center',
                    md: 'unset'
                  }}
                >
                  Connect your wallet in order to add & verify accounts to your Governator profile.
                </Text>
              </Flex>
              <Box
                mx={{
                  base: 'auto',
                  md: 'unset'
                }}
              >
                <Button
                  colorScheme={'purple'}
                  isDisabled={wallet?.provider ? false : true}
                  mr='16px'
                  onClick={() => signInWithEthereum()}
                >{verified ? 'Verify' : 'Verify'}</Button>
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
          <Box
            bg='gray.700'
            p={{
              base: '2.5rem 1rem',
              md: 10
            }}
            w={{
              base: 'calc(100vw - 64px)',
              lg: '1044px'
            }}
          >
            <VStack spacing={10}>
              <Box>
                <Text
                  color='white'
                  fontSize='2xl'
                  textAlign={'center'}
                >Verified Addresses</Text>
                <Text
                  color='white'
                  w='25rem'
                  mx={{
                    base: 'auto',
                    md: 'unset'
                  }}
                  textAlign={{
                    base: 'center',
                    md: 'unset'
                  }}
                >The token balances in these addresses will all be used during the voting process.</Text>
              </Box>
              {/* Render Poll Listings */}
              <Box
                overflowX={'scroll'}
                w='100%'
              >
                <DataTable
                  data={addressesData.filter((address: any) => address.verifiedDate !== 'False')}
                  columns={columns}
                  loading={isLoadingAddresses}
                />
              </Box>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

Account.getLayout = (page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>;

export default Account;