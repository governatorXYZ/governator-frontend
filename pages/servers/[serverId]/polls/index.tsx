import type { NextPage } from 'next'
import NextLink from 'next/link'
import {
  Box,
  VStack,
  Text,
  Flex,
  Spinner,
  Button,
  Container,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Govcrumb from 'components/BreadCrumb'
import useServers from 'hooks/useServers'
import useSWR from 'swr'
import { privateBaseFetcher } from 'constants/axios'
import { Poll, RenderedPoll } from 'interfaces'
import * as luxon from 'luxon'
import { FaDiscord } from 'react-icons/fa'
import { FiBarChart } from 'react-icons/fi'
import DeletePoll from 'components/polls/DeletePoll'
import DataTable from 'components/Datatable'
import React, { useEffect, useState } from 'react'
import SearchBox from 'components/SearchBox'
import useServer from 'hooks/useServer'

const columns = [
  {
    Header: 'Created',
    accessor: 'created',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Channel',
    accessor: 'channel',
  },
  {
    Header: 'Author',
    accessor: 'author',
  },
  {
    Header: 'Votes',
    accessor: 'votes',
  },
  {
    Header: 'Actions',
    accessor: 'actions',
  },
]

const Polls: NextPage = () => {
  const router = useRouter()
  const { loading, currentServer } = useServers()
  const { channels, loading: isLoadingChannels } = useServer()

  const { data, error, mutate } = useSWR('/poll/list', privateBaseFetcher)
  const pollsData = data?.data ? (data?.data as Poll[]) : []
  const isLoadingPolls = !data && !error

  const [polls, setPolls] = useState<RenderedPoll[]>([])
  const [originalPolls, setOriginalPolls] = useState<RenderedPoll[]>([])

  const setNewPolls = (newPolls: Record<string, any>[]) => {
    setPolls(newPolls)
  }

  console.log(channels)

  useEffect(() => {
    if (data) {
      setOriginalPolls(fetchPolls())
      setPolls(fetchPolls())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoadingChannels])


  const fetchPolls = () => {
    return pollsData.map(p => {
      return {
        id: p._id,
        created: luxon.DateTime.fromISO(p.createdAt).toFormat('LLL dd yyyy t'),
        name: p.title,
        channel: isLoadingChannels
            ? 'Loading...'
            : (channels.find(chan => chan.value === (p.client_config.find((conf) => conf.provider_id === 'discord')?.channel_id)))?.label,
        author: p.author_user_id,
        votes: 0,
        actions: (
            <Flex w='max-content' mx='auto'>
              <DeletePoll poll={p} mutate={mutate}/>
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
                <FaDiscord fontSize='15px'/>
              </Button>
              <NextLink href={`${router.asPath}/results/${p._id}`}>
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
                >
                  <FiBarChart fontSize='15px'/>
                </Button>
              </NextLink>
            </Flex>
        ),
      }
    })
  }

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
                my='2rem'
              >
                Poll Listings
              </Text>
              <Box>
                <Flex mb='1rem'>
                  <SearchBox
                    setValue={setNewPolls}
                    originalValues={originalPolls}
                    searchKeys={['name']}
                    placeholder='Search poll name...'
                  />
                </Flex>
                <DataTable
                  data={polls}
                  columns={columns}
                  loading={isLoadingPolls}
                />
              </Box>
            </>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default Polls
