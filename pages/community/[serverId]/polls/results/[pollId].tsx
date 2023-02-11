import type { NextPage } from 'next'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Spinner,
  RadioGroup,
  Radio,
  Button,
  VStack
} from '@chakra-ui/react'
import { useState } from 'react';
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { privateBaseFetcher } from 'constants/axios'
import { Poll } from 'interfaces'
import Govcrumb from 'components/BreadCrumb'
import DisplayPollResults from 'components/polls/DisplayPollResults'
import {useTotalVotes, useVotesData} from "../../../../../hooks/useVoteData";
import useServers from 'hooks/useServers'
import { ChevronRightIcon } from '@chakra-ui/icons'

interface VotingControlsProps {
  options: Array<Record<string, any>>;
}

function VotingControls({ options }: VotingControlsProps) {
  const [value, setValue] = useState('')
  return (
    <Box
      color='gray.100'
      borderRadius='2px'
      padding='1em'
      border='1px solid'
      borderColor='gray.100'
      w='fit-content'
    >
      <Heading
        size='md'
        mb='16px'
      >
          Cast Your Vote
      </Heading>
      <RadioGroup
        onChange={setValue}
        value={value}
      >
        <VStack align='flex-start'>
          {options.map((option: any, index: number) => (
            <Radio
              key={index}
              value={option.poll_option_id}
            >
              { option.poll_option_name } { option.poll_option_emoji }
            </Radio>
          ))}
        </VStack>
      </RadioGroup>
      <Button
        w='100%'
        mt='32px'
        colorScheme='red'
      >Vote</Button>
    </Box>
  )
}

const PollResults: NextPage = () => {

  const usePollData = (): any => {
    const { data } = useSWR(`/poll/${router.query.pollId}`, privateBaseFetcher)
    const pollData = data?.data ? (data?.data as Poll) : {} as Poll
    return { pollData, error }
  }
  const { loading, currentServer } = useServers()

  const router = useRouter()

  const { pollData, error } = usePollData()
  const { votesData } = useVotesData(router.query.pollId as string);
  const { totalVotes } = useTotalVotes(router.query.pollId as string);
  
  const isLoadingPoll = !pollData && !error

  function returnToServer() {
    router.push(`/community/${currentServer?.id ?? ''}`)
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
        <VotingControls options={pollData.poll_options} />
        <DisplayPollResults pollData={pollData} voteData={votesData} totalVotes={totalVotes}/>
      </Box>
    </Box>
  )
}

export default PollResults
