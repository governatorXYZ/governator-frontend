import type { NextPage } from 'next'
// import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Text,
} from '@chakra-ui/react'

import { BiBarChartSquare } from 'react-icons/bi'

import Govcrumb from 'components/BreadCrumb'
import DisplayPollResults from 'components/polls/DisplayPollResults'

const PollResults: NextPage = () => {
  return (
    <Box bg='dark-2' minH='calc(100vh - 90px)' pt='4rem' pb='8rem'>
      <Box bg='dark-1' maxW='2xl' mx='auto' p='2rem 3rem'>
        <Govcrumb />
        <Flex
          color='gray.100'
          fontSize='2xl'
          fontWeight='600'
          mt='3rem'
          alignItems='center'
          mx='auto'
          maxW='max-content'>
          <BiBarChartSquare fontSize='36px' />
          <Text as='span' display='block' align='center' ml='1rem'>
            Poll Name Here ..
          </Text>
        </Flex>
        <DisplayPollResults mt='2rem' />
      </Box>
    </Box>
  )
}

export default PollResults