import type { NextPage } from 'next'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { privateBaseFetcher } from 'constants/axios'
import { Poll } from 'interfaces'
import DisplayPollResults from 'components/polls/DisplayPollResults'
import {useTotalVotes, useVotesData} from "../../../../../hooks/useVoteData";
import useServers from 'hooks/useServers'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { writableLoadableAtom } from 'atoms'
import { useAtom } from 'jotai'
import { useEffect } from 'react'



const PollResults: NextPage = () => {
  const [, refreshLoadable] = useAtom(writableLoadableAtom)
  
  useEffect(() => {
    refreshLoadable();
  },[refreshLoadable])

  const usePollData = (): any => {
    const {
      data,
      error
    } = useSWR(`/poll/${router.query.pollId}`, privateBaseFetcher)
    const pollData = data?.data ? (data?.data as Poll) : {} as Poll
    return {
      pollData,
      error
    }
  }
  const { currentServer } = useServers()

  const router = useRouter()

  const { pollData, error } = usePollData()
  const { votesData } = useVotesData(router.query.pollId as string);
  const { totalVotes } = useTotalVotes(router.query.pollId as string);

  const isLoadingPoll = !pollData && !error

  function returnToServer() {
    router.push(`/dashboard`)
  }

  // TODO: clean up comments.
  return (
    <Box bg='dark-2' minH='calc(100vh - 90px)' pt='4rem' pb='8rem'>
      <Box bg='dark-1' maxW='2xl' mx='auto' p='2rem 3rem'>
        {/* <Govcrumb currentServerName={currentServer?.name}/> */}
        <Breadcrumb
          spacing='8px'
          separator={<ChevronRightIcon color='gray.500' />}
          color='gray.300'
        >
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={returnToServer}
            >
              Back
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        {isLoadingPoll && (
          <Flex>
            <Spinner color='gray.200' mx='auto' />
          </Flex>
        )}
        <DisplayPollResults
          pollData={pollData}
          voteData={votesData}
          totalVotes={totalVotes}
        />
      </Box>
    </Box>
  )
}

export default PollResults
