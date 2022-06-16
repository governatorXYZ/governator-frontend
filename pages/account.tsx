import type { NextPage } from 'next';
import { useSession } from 'next-auth/react'
import moment from 'moment';
import useSWR from 'swr';
import { useAtom } from 'jotai';
import { userAtom } from 'atoms';

import {
  Box,
  Button,
  VStack,
  Text,
  Flex,
} from '@chakra-ui/react'
import CustomButton from '../components/common/Button';

import { Address } from '../interfaces';

import { privateBaseFetcher } from '../constants/axios';
import Siwe from '../modules/siwe';

import DataTable from 'components/Datatable';

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

    const connectWallet = async (): Promise<void> => {
    const ethWallet = await Siwe.connectWallet();
    setUser({ userId: ethWallet.user_id });
  };

  const signInWithEthereum = async (): Promise<void> => {
    await Siwe.signInWithEthereum(session?.discordId as unknown as string);
    mutate();
  }

  const removeWallet = async (walletAddress:string): Promise<void> => {
    await Siwe.removeWallet(walletAddress)
    mutate();
  }

  const useAddressesData = (): any => {

    const { data, error, mutate } = useSWR(`/account/ethereum/get-by-user-id/${user?.userId}`, privateBaseFetcher)
    const rawData = data?.data ? (data?.data) as Address[] : [] as Address[]
    const addressesData = rawData.map((_address: Address, idx: number) => {
      return {
        idx: idx + 1,
        _id: _address._id,
        verifiedDate: _address.verified ? moment(_address.updatedAt).format('LL') : 'False',
        actions: (
          <Flex w='max-content' mx='auto'>
            {!_address.verified ?
              <CustomButton text='Verify' onClick={() => signInWithEthereum()}/> :
              <div>
                <CustomButton text='Remove' onClick={() => removeWallet(_address._id)}/>
                <CustomButton text='Reverify' onClick={() => null}/>
              </div>
            }
          </Flex>
        )
      }
    })

    return { addressesData, error, mutate }
  }

  const { addressesData, error, mutate } = useAddressesData()
  const isLoadingAddresses = !addressesData && !error
  const { data: session } = useSession()

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

              <Button onClick={() => connectWallet()}>Connect Wallet</Button>

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