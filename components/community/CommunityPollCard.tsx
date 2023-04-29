import {
  Heading,
  Spinner,
  HStack,
  Text,
  Flex,
  Box
} from '@chakra-ui/react'
import { Router, useRouter } from 'next/router';

interface CommunityPollCardProps {
  description?: string;
  endDate?: string;
  author?: string;
  title: string;
  channel?: any;
  id?: string;
}

const CommunityPollCard = ({
  description,
  endDate,
  channel,
  author,
  title,
  id
}: CommunityPollCardProps) => {

  const router = useRouter();

  const visitPoll = () => {
    router.push(`/community/${channel?.provider_id}/polls/results/${id}`)
  }

  if (!id) return (<Spinner size='lg' />)

  return (
    <Flex
      direction='column'
      borderRadius='10px'
      textAlign={'left'}
      onClick={visitPoll}
      cursor={'pointer'}
      color='white'
      bg='#303F56'
      w='810px'
      h='300px'
      mb='20px'
      p='20px'
    >
      <HStack mb='20px' justify={'space-between'}>
        <Flex direction='row'>
          <Box
            borderRadius={'full'}
            bg='#656565'
            mr='10px'
            w='24px'
            h='24px'
          />
          <Text>{ author }</Text>
        </Flex>
        <Box>#{ channel?.provider_id ?? 'unknown'}</Box>
      </HStack>
      <Heading mb='14px'>{ title }</Heading>
      <Text mb='20px' flexGrow='2'>{ description }</Text>
      <HStack
        justify={'space-between'}
        justifySelf='flex-end'
        borderTop='0.5px solid #7F9AC7'
        pt='14px'
      >
        <Box>Total Votes</Box>
        <Box>
          <Text>{ endDate }</Text>
        </Box>
      </HStack>
    </Flex>
  );
}

export default CommunityPollCard
