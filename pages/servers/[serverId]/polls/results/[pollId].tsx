import type { NextPage } from 'next'
// import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Text,
  Spinner
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { privateBaseFetcher } from 'constants/axios'
import { Poll } from 'interfaces'
import Govcrumb from 'components/BreadCrumb'
import DisplayPollResults from 'components/polls/DisplayPollResults'

const PollResults: NextPage = () => {

  const router = useRouter()

  const { data, error, mutate } = useSWR(`/poll/${router.query.pollId}`, privateBaseFetcher)
  const pollData = data?.data ? (data?.data as Poll) : {} as Poll
  const isLoadingPoll = !data && !error

  return (
    <Box bg='dark-2' minH='calc(100vh - 90px)' pt='4rem' pb='8rem'>
      <Box bg='dark-1' maxW='2xl' mx='auto' p='2rem 3rem'>
        <Govcrumb />
        {isLoadingPoll && (
          <Flex>
            <Spinner color='gray.200' mx='auto' />
          </Flex>
        )}
        <DisplayPollResults pollData={pollData}/>
      </Box>
    </Box>
  )
}

export default PollResults