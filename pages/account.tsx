import type { NextPage } from 'next';
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

  const useAddressesData = (): any => {

    console.log({ user })
    /**
     * @ken cannot have conditional custom hooks. 
     * how to prevent repeated failed calls when user.userId is ''
     */
    // if (!user || !user.userId) {
    //   return { addressesData: [], error: false }
    // }

    const { data, error } = useSWR(`/account/ethereum/get-by-user-id/${user?.userId}`, privateBaseFetcher)
    const rawData = data?.data ? (data?.data) as Address[] : [] as Address[]
    const addressesData = rawData.map((_address: Address, idx: number) => {
      console.log({ _address })
      return {
        idx: idx + 1,
        _id: _address._id,
        verifiedDate: _address.verified ? moment(_address.updatedAt).format('LL') : 'False',
        actions: (
          <Flex w='max-content' mx='auto'>
            {!_address.verified ?
              <Button
                variant='ghost'
                size='sm'
                color='purple.500'
                _active={{
                  color: 'white',
                  backgroundColor: 'purple.300',
                }}
                _hover={{
                  color: 'white',
                  backgroundColor: 'purple.500',
                }}
                onClick={() => Siwe.signInWithEthereum(_address.nonce)}
              >
                {`Verify ${_address.nonce}`}
              </Button> :
              <div>
              <Button
                variant='ghost'
                size='sm'
                color='purple.500'
                _active={{
                  color: 'white',
                  backgroundColor: 'purple.300',
                }}
                _hover={{
                  color: 'white',
                  backgroundColor: 'purple.500',
                }}
              >Remove</Button>
              <Button
                variant='ghost'
                size='sm'
                color='purple.500'
                _active={{
                  color: 'white',
                  backgroundColor: 'purple.300',
                }}
                _hover={{
                  color: 'white',
                  backgroundColor: 'purple.500',
                }}
              >Reverify</Button>
              </div>
            }
          </Flex>
        )
      }
    })

    return { addressesData, error }
  }

  const connectWallet = async (): Promise<void> => {
    const ethWallet = await Siwe.connectWallet();
    setUser({ userId: ethWallet.user_id });
  };

  const signInWithEthereum = async (nonce: string): Promise<void> => {
    console.log("SIGING IN")
    const updatedEthWallet = await signInWithEthereum(nonce);
    console.log({ updatedEthWallet })
  }

  const { addressesData, error } = useAddressesData()
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