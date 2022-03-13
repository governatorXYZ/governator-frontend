import type { NextPage } from 'next'
import {
  Box,
  Text,
  Flex,
} from '@chakra-ui/react'
import { BiBarChartSquare } from 'react-icons/bi'
import CreatePollForm from 'components/polls/CreatePollForm'
import GovCrumb from 'components/BreadCrumb';

const CreatePoll: NextPage = () => {
  return (
    <Box bg='dark-2' minH='calc(100vh - 90px)' pt='4rem' pb='8rem'>
      <Box bg='dark-1' maxW='2xl' mx='auto' p='2rem 3rem'>
        <GovCrumb />
        <Flex
          color='gray.100'
          fontSize='2xl'
          fontWeight='600'
          mt='3rem'
          alignItems='center'
          mx='auto'
          maxW='max-content'
        >
          <BiBarChartSquare fontSize='36px' />
          <Text as='span' display='block' align='center' ml='1rem'>
            Creating Poll
          </Text>
        </Flex>
        <CreatePollForm mt='2rem' />
      </Box>
    </Box>
  )
}

export default CreatePoll
