import {
  Heading,
  Button,
  HStack,
  Image,
  Text,
  Flex,
  Box
} from '@chakra-ui/react'
import { ClientConfigBase } from 'governator-sdk';
import { useRouter } from 'next/router';

interface CommunityPollCardProps {
  description?: string;
  endDate?: string;
  author?: string;
  title: string;
  channel?: ClientConfigBase;
}

const CommunityPollCard = ({
  description,
  endDate,
  channel,
  author,
  title,
}: CommunityPollCardProps) => {

  const router = useRouter();

  return (
    <Flex
      direction='column'
      borderRadius='10px'
      textAlign={'left'}
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
        <Box>
          #{ channel?.provider_id ?? 'unknown'}
        </Box>
      </HStack>
    <Heading mb='14px'>{ title }</Heading>
    <Text mb='20px' flexGrow='2'>{ description }</Text>
    <HStack
      justify={'space-between'}
      justifySelf='flex-end'
      borderTop='0.5px solid #7F9AC7'
      pt='14px'
    >
      <Box>
        Total Votes
      </Box>
      <Box>
        <Text>{ endDate }</Text>
      </Box>
    </HStack>
  </Flex>
  );
}

export default CommunityPollCard
