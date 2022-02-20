import type { NextPage } from 'next'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Flex,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { BiBarChartSquare } from 'react-icons/bi'
import CreatePollForm from 'components/polls/CreatePollForm'

const CreatePoll: NextPage = () => {
  return (
    <Box bg='dark-2' minH='calc(100vh - 90px)' pt='4rem' pb='8rem'>
      <Box bg='dark-1' maxW='2xl' mx='auto' p='2rem 3rem'>
        <Breadcrumb
          spacing='8px'
          separator={<ChevronRightIcon color='gray.500' />}
          color='gray.300'
        >
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Servers</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>BanklessDAO</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Polls</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage color='blue.300' fontWeight='500'>
            <BreadcrumbLink href='#'>Create</BreadcrumbLink>
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
        <CreatePollForm mt='2rem' />
      </Box>
    </Box>
  )
}

export default CreatePoll
