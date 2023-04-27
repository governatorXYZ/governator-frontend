import type { NextPage } from 'next'
import {
  Box,
  Text,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { BiBarChartSquare } from 'react-icons/bi'
import PollForm from 'components/polls/PollForm'
import { useRouter } from 'next/router'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Head from 'next/head'

const CreatePoll: NextPage = () => {
  const router = useRouter()

  return (
    <Box bg='dark-2' minH='calc(100vh - 90px)' pt='4rem' pb='8rem'>
      <Head>
        <title>Governator | Create Poll</title>
      </Head>
      <Box bg='dark-1' maxW='2xl' mx='auto' p='2rem 3rem'>
        {/* <GovCrumb currentServerName={currentServer?.name} /> */}
        <Breadcrumb
          spacing='8px'
          separator={<ChevronRightIcon color='gray.500' />}
          color='gray.300'
        >
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.back()}>Back</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
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
        <PollForm mt='2rem' />
      </Box>
    </Box>
  )
}

export default CreatePoll
