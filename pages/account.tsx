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
import {privateBaseAxios, privateBaseFetcher } from '../constants/axios';
import Siwe from '../modules/siwe';

/* UI Components */
import CustomButton from '../components/common/Button';
import DataTable from 'components/Datatable';

/* Types */
import { Address } from '../interfaces';

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


const Account: NextPage = () => {

  const [user, setUser] = useAtom(userAtom);
  const [ isConnected, setIsConnected ] = useState(false);
  const [ isConnecting, setIsConnecting ] = useState(false);
  // const [provider, setProvider] = useAtom(providerAtom);

  const { data: session } = useSession()

  useEffect( () => {
        const fetchUser = async () => {
          if (user.userId === '') await setUser({userId: (await privateBaseAxios.get(`/user/discord/${session?.discordId}`)).data._id});
        }
        fetchUser().then(() => null)
      },

      //eslint-disable-next-line react-hooks/exhaustive-deps
      [session?.discordId]
  )

  /* For SIWE Connect Button */
  const connectWallet = async (): Promise<void> => {
    if (!user?.userId || user?.userId === '') {
      alert('Please log in with Discord first')
      return;
    }
    setIsConnecting(true);
    try {
      const ethWallet = await Siwe.connectWallet();
      if (!ethWallet) return;
      setIsConnected(true);
      setIsConnecting(false)
      await Siwe.createWalletAccount(ethWallet, user?.userId);
      mutate?.();
    } catch (e: unknown) {
      console.error("There was an error");
    }
  };
  /* END For SIWE Connect Button */

  const signInWithEthereum = async (): Promise<void> => {
    await Siwe.signInWithEthereum(session?.discordId as unknown as string);
    mutate?.();
  }

  const removeWallet = async (walletAddress:string): Promise<void> => {
    await Siwe.removeWallet(walletAddress)
    mutate?.();
  }

  const useAddressesData = (): any => {
    // user ? ['/api/orders', user] : null, fetchWithUser
    const { data, error, mutate } = useSWR((user?.userId !== '') ? `/account/ethereum/get-by-user-id/${user?.userId}` : null, privateBaseFetcher);
    const rawData = data?.data ? (data?.data) as Address[] : [] as Address[]
    const addressesData = rawData.map((_address: Address, idx: number) => {
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
            {!_address.verified ?
              <div>
                <CustomButton
                  color='purple'
                  text='Verify'
                  onClick={() => signInWithEthereum()}
                  disabled={!isConnected}
                />
                <CustomButton
                  color='red'
                  text='Remove'
                  onClick={() => removeWallet(_address._id)}
                />
              </div> :
              <div>
                <CustomButton
                  color='purple'
                  text='Reverify'
                  onClick={() => signInWithEthereum()}
                  disabled={!isConnected}
                />
                <CustomButton
                  color='red'
                  text='Remove'
                  onClick={() => removeWallet(_address._id)}
                />
              </div>
            }
          </Flex>
        )
      }
    })

    return { addressesData, error, mutate }
  }

  const {addressesData, error, mutate} = useAddressesData();
  const isLoadingAddresses = !addressesData && !error

  return (
    <Box>
      <Box bg='black' h='100vh' pt='30'>
        <Flex justifyContent='center' alignItems='center'>

          {/* Account Details Box */}
          <Box bg='gray.700' p={10}>
            <VStack spacing={10}>
              <Text color='white' fontSize='2xl'>
                My Account
              </Text>

              <Button
                onClick={() => connectWallet()}
                isLoading={isConnecting}
              >
                { isConnected ? 'Connected' : 'Connect Wallet' }
              </Button>

              {/* Render Poll Listings */}
              <DataTable
                data={addressesData}
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