import type { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  VStack,
  Grid,
  Text,
  Flex,
  Image,
  Spinner,
  Container,
  Heading,
  HStack,
} from '@chakra-ui/react'
import Govcrumb from 'components/BreadCrumb'
import useServers from 'hooks/useServers'
import { FiBarChart } from 'react-icons/fi'
import DataTable from 'components/Datatable'
import SearchBox from 'components/SearchBox'
import * as luxon from 'luxon'
import DeletePoll from 'components/polls/DeletePoll'
import { FaDiscord } from 'react-icons/fa'
import useSWR from 'swr'
import { privateBaseFetcher } from 'constants/axios'
import { useGovernatorUser } from 'hooks/useGovernatorUser'
import useServer from 'hooks/useServer'
import { Poll, RenderedPoll } from 'interfaces'
import { useState, useEffect } from 'react'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const { loading, currentServer } = useServers()
  const { channels, loading: isLoadingChannels } = useServer()
  const governatorUser = useGovernatorUser()

  const { data, error, mutate } = useSWR(governatorUser.userId ? `/poll/user/${governatorUser.userId}` : null, privateBaseFetcher);
  let pollsData = data?.data ? (data?.data as Poll[]) : []

  const filteredPollsData: Poll[] = [];

  if (currentServer) {
    pollsData.forEach((poll) => {
      if (poll.client_config.find(config => config.guild_id === currentServer.id)) {
        filteredPollsData.push(poll)
      }
    });
  }

  pollsData = filteredPollsData as Poll[];

  pollsData.sort(function (a, b) {
    return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0
  });

  const isLoadingPolls = !data && !error

  const [polls, setPolls] = useState<RenderedPoll[]>([])
  const [originalPolls, setOriginalPolls] = useState<RenderedPoll[]>([])

  const setNewPolls = (newPolls: Record<string, any>[]) => {
    setPolls(newPolls)
  }

  useEffect(() => {
    if (data) {
      setOriginalPolls(fetchPolls())
      setPolls(fetchPolls())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoadingChannels])

  const columns = [
    {
      Header: 'Title',
      accessor: (data: unknown) => data,
      Cell: ({ value }: {
        value: Record<string, any>
      }) => (<NextLink href={`${router.asPath}/polls/results/${value.id}`}>{ value.name }</NextLink>)
    },
    {
      Header: 'Start Date',
      accessor: 'created',
    },
    {
      Header: 'End Date',
      accessor: 'end_date',
    },
    // {
    //   Header: 'Channel',
    //   accessor: 'channel',
    // },
    // {
    //   Header: 'Author',
    //   accessor: 'author',
    // },
    // {
    //   Header: 'Votes',
    //   accessor: 'votes',
    // },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ]

  const fetchPolls = () => {
    return pollsData.map(p => {
      return {
        id: p._id,
        name: p.title,
        created: luxon.DateTime.fromISO(p.createdAt).toFormat('LLL dd yyyy t'),
        end_date: luxon.DateTime.fromISO(p.end_time).toFormat('LLL dd yyyy t'),
        // channel: isLoadingChannels
        //   ? 'Loading...'
        //   : (channels.find(chan => chan.value === (p.client_config.find((conf) => conf.provider_id === 'discord')?.channel_id)))?.label,
        // author: governatorUser.discordUsername,
        // votes: 0, -- needs implementing endpoint on BE
        actions: (
          <Flex w='max-content' mx='auto'>
            <DeletePoll poll={p} mutate={mutate} />
            <NextLink href={`${router.asPath}/polls/results/${p._id}`}>
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
                <FiBarChart fontSize='15px' />
              </Button>
            </NextLink>
          </Flex>
        ),
      }
    })
  }

  const dashboardButtons = [
    {
      title: 'Create Poll',
      icon: <AddIcon />,
      href: `${router.asPath}/polls/create`,
    },
  ]

  const serverImg = `https://cdn.discordapp.com/icons/${currentServer?.id}/${currentServer?.icon}.png`

  return (
      <Box bg='dark-2' minH='calc(100vh - 60px)' pt='4rem' pb='8rem'>
        <Container maxW='container.xl'>
          <Box bg='dark-1' mx='auto' p='2rem 3rem'>
            <Flex justifyContent='space-between' alignItems='center'>
              <Govcrumb currentServerName={currentServer?.name} />
            </Flex>
            <Flex
              my='3rem'
              justifyContent='space-between'
              alignItems='flex-end'
            >
          {/* Dashboard Buttons Box */}
          {!loading && currentServer && (
                <Box>
                  <Image
                    src={serverImg}
                    alt='user-avatar'
                    borderRadius='full'
                    boxSize='70px'
                    mx='auto'
                  />
                  <Text
                    as='span'
                    display='block'
                    color='gray.200'
                    fontSize='2xl'
                    mt='1rem'
                  >
                    {currentServer.name}
                  </Text>
                </Box>
              )}
              <Heading
                as='h2'
                display='block'
                color='gray.200'
                fontSize='2xl'
                mt='1rem'
              >My Polls</Heading>
              <HStack spacing={4}>
                <SearchBox
                    setValue={setNewPolls}
                    originalValues={originalPolls}
                    searchKeys={['name']}
                    placeholder='Search poll title...'
                  />
                {loading && <Spinner color='gray.200' />}
                {/* Render server icons */}
                <Grid templateColumns='1fr' gap={6}>
                  {dashboardButtons.map((_button, idx) => {
                    return (
                      <Box key={`button-${idx}`} width='100%'>
                        <NextLink href={_button.href}>
                          <Button
                            leftIcon={_button.icon}
                            color='blue.600'
                            variant='solid'
                            minW='4xs'
                          >
                            {_button.title}
                          </Button>
                        </NextLink>
                      </Box>
                    )
                  })}

                </Grid>
              </HStack>
        </Flex>

            {loading && (
              <Flex justifyContent='center' alignItems='center' mt='5rem'>
                <VStack spacing={10}>
                  <Spinner color='gray.200' />
                </VStack>
              </Flex>
            )}
            {!loading && (
              <>
                <Box>
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

export default Dashboard
