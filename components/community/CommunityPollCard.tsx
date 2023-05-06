import { useRouter } from 'next/router';
import { useMemo } from 'react';
import {
  Heading,
  Spinner,
  HStack,
  Text,
  Flex,
  Box
} from '@chakra-ui/react'

interface CommunityPollCardProps {
  description?: string;
  endDate: string;
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

  
  const pollStatus = useMemo(() => {
    const currentDate = new Date();
    const end = new Date(endDate);

    return (end < currentDate) ? 'Closed' : endDate;
  }, [endDate])


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
      w={{
        base: '100vw',
        md: '810px'
      }}
      h='300px'
      mb='20px'
      p='20px'
    >
      <HStack mb='20px' justify={'space-between'}>
        <Flex direction='row'>
          <Box
            borderRadius={'full'}
            bg='#656565'
            mr='8px'
            w='24px'
            h='24px'
          />
          <Text>{ author }</Text>
        </Flex>
        <Box
          color='#B8C6DD'
        >
          #{ channel?.provider_id ?? 'unknown'}
        </Box>
      </HStack>
      <Heading
        fontSize={{
          base: '18px',
          md: '24px'
        }}
        fontWeight={{
          base: '400',
          md: '500'
        }}
        mb='14px'
      >{ title }</Heading>
      <Text
        mb='20px'
        flexGrow='2'
        color='#D9E3F2'
      >{ description }</Text>
      <HStack
        justify={'space-between'}
        justifySelf='flex-end'
        borderTop='0.5px solid #7F9AC7'
        pt='14px'
      >
        <Box>Total Votes</Box>
        <Box
          bg="#C884D080"
          p='.25em .75em'
          borderRadius={'full'}
        >
          <Text>{ pollStatus }</Text>
        </Box>
      </HStack>
    </Flex>
  );
}

export default CommunityPollCard
