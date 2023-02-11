import type { KeyedMutator } from 'swr'
import type { AxiosResponse } from 'axios';
import { privateBaseAxios } from 'constants/axios'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useToast, Spinner, Flex, Box, Heading, RadioGroup, Radio, VStack, Button } from '@chakra-ui/react';

interface VotingControlsProps {
  options: Array<Record<string, any>>;
  pollId: string;
  updatePoll: KeyedMutator<AxiosResponse<any, any>>;
}

export default function VotingControls({ options, pollId, updatePoll }: VotingControlsProps) {
  const [value, setValue] = useState('')

  const toast = useToast();
  const { data: sessionData } = useSession();

  const handleSubmitVote = async () => {
    try {
      const account = sessionData?.discordId ?? '';
      const votePayload = {
        poll_option_id: value,
        account_id: account,
        provider_id: "discord"
      }
      await privateBaseAxios.post(`/vote/${pollId}`, votePayload);
      toast({
        title: 'Success',
        description: "Vote submitted",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      // this is supposed to invalidate the SWR cache and refetch.
      await updatePoll();
    } catch (error: unknown) {
      toast({
        title: 'Error',
        description: (error as Error).message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleSubmitUnvote = async () => {
    setValue('');
    handleSubmitVote();
  }

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
      {options ? (
        <RadioGroup
          onChange={setValue}
          value={value}
        >
          <VStack
            align='flex-start'
          >
            {options.map((option: any, index: number) => (
              <Radio
                key={index}
                value={option.poll_option_id}
              >
                {option.poll_option_name} {option.poll_option_emoji}
              </Radio>
            ))}
          </VStack>
        </RadioGroup>) : (<Spinner color='gray.200' mx='auto' />)}
      <Flex mt='2em'>
        <Button
          mr='1em'
          colorScheme='green'
          onClick={handleSubmitVote}
        >Vote</Button>
        <Button
          colorScheme='red'
          onClick={handleSubmitUnvote}
        >Unvote</Button>
      </Flex>
    </Box>
  )
}