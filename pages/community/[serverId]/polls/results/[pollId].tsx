import type { NextPage } from 'next'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Spinner, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { pollFetcher } from 'constants/axios'
import DisplayPollResults from 'components/polls/DisplayPollResults'
import {useTotalVotes, useVotesData} from "../../../../../hooks/useVoteData";
import useServers from 'hooks/useServers'
import { ChevronRightIcon } from '@chakra-ui/icons'
interface BackButtonProps {
  returnToServer: () => void
}

const BackButton = ({
  returnToServer
}: BackButtonProps) => (<Breadcrumb
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
</Breadcrumb>)

const Loader = () => (
  <Flex
    justify='center'
    align='center'
    h='100%'
    p='2rem'
  >
    <Spinner color='white' size='xl' />
  </Flex>
);

const PollResults: NextPage = () => { 
  const router = useRouter()
  const toast = useToast();
  const { loading, currentServer } = useServers()
  const id: string = router.query.pollId as string;

  const {
    data: pollData,
    error: pollError
  } = useSWR(`/poll/${id}`, pollFetcher);

  const { data: voteData, error: voteDataError } = useVotesData(id);
  const { data: totalVotes, error: totalVotesError } = useTotalVotes(id);

  function returnToServer() {
    router.push(`/community/${currentServer?.id ?? ''}`)
  }

  if (pollError) {
    toast({
      title: 'Error',
      description: 'An error occurred while fetching poll data.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  if (voteDataError) {
    toast({
      title: 'Error',
      description: 'An error occurred while fetching vote data.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  if (totalVotesError) {
    toast({
      title: 'Error',
      description: 'An error occurred while fetching total votes data.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  // TODO: clean up comments.
  return (
    <Box bg='dark-2' minH='calc(100vh - 90px)' pt='4rem' pb='8rem'>
      <Box bg='dark-1' maxW='2xl' mx='auto' p='2rem 3rem'>
        <BackButton returnToServer={returnToServer} />
        { 
          !pollData 
            ? (<Loader />)
            : (<DisplayPollResults
                pollData={pollData}
                voteData={voteData}
                totalVotes={totalVotes}
              />)
        }
      </Box>
    </Box>
  )
}

export default PollResults
