import type { NextPage } from 'next';
import { useSession } from 'next-auth/react'
import moment from 'moment';
import useSWR from 'swr';
import { useAtom } from 'jotai';
import { userAtom, providerAtom } from 'atoms';

import {
  Box,
  Button,
  VStack,
  Text,
  Flex,
} from '@chakra-ui/react'

/* Modules */
import { privateBaseFetcher } from '../constants/axios';
import Siwe from '../modules/siwe';
import Web3 from '../modules/web3';

/* UI Components */
import CustomButton from '../components/common/Button';
import DataTable from 'components/Datatable';
import Web3ConnectButton from 'components/Web3ConnectButton';

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
  const [provider, setProvider] = useAtom(providerAtom);

  /* For SIWE Connect Button */
  const connectWallet = async (): Promise<void> => {
    const ethWallet = await Siwe.connectWallet();
  };
  /* END For SIWE Connect Button */

  const signInWithEthereum = async (): Promise<void> => {
    // await Siwe.signInWithEthereum(session?.discordId as unknown as string);
    await Web3.signInWithEthereum(provider, session?.discordId as unknown as string);
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
              <div>
                <CustomButton color='purple' text='Verify' onClick={() => signInWithEthereum()}/>
                <CustomButton color='red' text='Remove' onClick={() => removeWallet(_address._id)}/>
              </div> :
              <div>
                <CustomButton color='purple' text='Reverify' onClick={() => null}/>
                <CustomButton color='red' text='Remove' onClick={() => removeWallet(_address._id)}/>
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

              {/*<Button onClick={() => connectWallet()}>Connect Wallet</Button>*/}
              <Web3ConnectButton />

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