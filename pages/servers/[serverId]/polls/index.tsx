import type { NextPage } from 'next'
import {
  Box,
  VStack,
  Text,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Container,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Govcrumb from 'components/BreadCrumb'
import useServers from 'hooks/useServers'
import styled from '@emotion/styled'
import useSWR from 'swr'
import { privateBaseFetcher } from 'constants/axios'
import { Poll } from 'interfaces'
import * as luxon from 'luxon'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { FaDiscord } from 'react-icons/fa'
import { FiBarChart } from 'react-icons/fi'
import DeletePoll from 'components/polls/DeletePoll'


const StyledTable = styled(Table)`
  & {
    thead tr {
      background-color: #1a1d24;
      th {
        border-color: transparent;
      }
    }
    tbody tr:nth-child(odd) {
      background-color: #21262e;
    }
    tbody tr td {
      border-color: transparent;
    }
  }
`

const pollOptions = [
  { value: '1234', label: '#chocolate' },
  { value: '2345', label: '#strawberry' },
  { value: '3456', label: '#vanilla' },
]

const Polls: NextPage = () => {
  const router = useRouter()
  const { loading, currentServer } = useServers()

  const { data, error, mutate } = useSWR('/poll/list', privateBaseFetcher)
  const polls = data?.data ? (data?.data as Poll[]) : []
  const isLoadingPolls = !data && !error

  return (
    <Box bg='dark-2' minH='calc(100vh - 60px)' pt='4rem' pb='8rem'>
      <Container maxW='container.xl'>
        <Box bg='dark-1' mx='auto' p='2rem 3rem'>
          <Govcrumb currentServerName={currentServer?.name} />
          {loading && (
            <Flex justifyContent='center' alignItems='center' mt='5rem'>
              <VStack spacing={10}>
                <Spinner color='gray.200' />
              </VStack>
            </Flex>
          )}
          {!loading && (
            <>
              <Text
                as='span'
                display='block'
                color='gray.200'
                mx='auto'
                w='max-content'
                fontSize='2xl'
                mt='2rem'
              >
                Poll Listings
              </Text>
              <StyledTable mt='2rem' color='gray.200'>
                <Thead>
                  <Tr>
                    <Th color='gray.200'>Created</Th>
                    <Th color='gray.200'>Name</Th>
                    <Th color='gray.200'>Channel</Th>
                    <Th color='gray.200'>Author</Th>
                    <Th color='gray.200'>Votes</Th>
                    <Th color='gray.200' textAlign='center'>
                      Actions
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {polls.map((p: Poll) => (
                    <Tr key={p._id}>
                      <Td>
                        {luxon.DateTime.fromISO(p.createdAt).toFormat(
                          'LLL dd yyyy t'
                        )}
                      </Td>
                      <Td>{p.title}</Td>
                      <Td>
                        {
                          pollOptions.find(
                            opt => opt.value === `${p.channel_id}`
                          )?.label
                        }
                      </Td>
                      <Td>{p.author_user_id}</Td>
                      <Td>0</Td>
                      <Td>
                        <Flex w='max-content' mx='auto'>
                          <DeletePoll poll={p} mutate={mutate} />
                          <Button
                            variant='ghost'
                            size='sm'
                            color='orange.500'
                            _active={{
                              color: 'white',
                              backgroundColor: 'orange.300',
                            }}
                            _hover={{
                              color: 'white',
                              backgroundColor: 'orange.500',
                            }}
                          >
                            <EditIcon fontSize='15px' />
                          </Button>
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
                          >
                            <FaDiscord fontSize='15px' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            color='teal.500'
                            _active={{
                              color: 'white',
                              backgroundColor: 'teal.300',
                            }}
                            _hover={{
                              color: 'white',
                              backgroundColor: 'teal.500',
                            }}
                            onClick={() => router.push(`${router.asPath}/results/${p._id}`)}
                          >
                            <FiBarChart 
                              fontSize='15px' 
                              />
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </StyledTable>
              {isLoadingPolls && (
                <Flex>
                  <Spinner color='gray.200' mx='auto' />
                </Flex>
              )}
              {!polls?.length && !isLoadingPolls && (
                <Text
                  as='span'
                  display='block'
                  w='max-content'
                  mx='auto'
                  color='gray.200'
                  mt='1rem'
                >
                  There are no polls.
                </Text>
              )}
            </>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default Polls
