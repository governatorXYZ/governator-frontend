import type { NextPage } from 'next'
import moment from 'moment';
import { 
    Box, 
    VStack, 
    Text, 
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from '@chakra-ui/react'
  
  const polls = [
    {
      created: Date.now(),
      name: 'Poll Number 1',
      channel: '#govbot',
      author: 'Ken#7046',
      votes: 1337,
    },
    {
      created: Date.now(),
      name: 'Poll Number 2',
      channel: '#dev-guild',
      author: 'stradford',
      votes: 10,
    },
    {
      created: Date.now(),
      name: 'Poll Number 3',
      channel: '#govbot',
      author: 'jamesmontgomery.eth',
      votes: 20,
    },
    {
      created: Date.now(),
      name: 'Poll Number 4',
      channel: '#govbot',
      author: 'Joel',
      votes: 30,
    },
    {
      created: Date.now(),
      name: 'Poll Number 5',
      channel: '#govbot-backend',
      author: 'Tiki',
      votes: 40,
    }
  ]

const PollListings: NextPage = () => {

    const actionButtons = () => {
        return (
            <Box>HELLO</Box>
        )
    }

  return (
    <Box>
      <Box bg='black' h='100vh' pt='30'>
        <Flex justifyContent='center' alignItems='center'>
          {/* Poll Listing Box */}

          <Box bg='gray.700' p={10}>
            <VStack spacing={10}>
              <Text color='white' fontSize='2xl'>
                Poll Listing
              </Text>

              {/* Render Poll Listings */}
              <Table variant='striped' colorScheme='blackAlpha' color='whiteAlpha.800' border='2px solid black'>
                <Thead>
                  <Tr bg='gray.800'>
                    <Th>Created</Th>
                    <Th>Name</Th>
                    <Th>Channel</Th>
                    <Th>Author</Th>
                    <Th isNumeric>Votes</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {polls.map((_poll,idx) => {
                    return (
                      <Tr key={`poll-${idx}`}>
                        <Td>{moment(_poll.created).format('LL')}</Td>
                        <Td>{_poll.name}</Td>
                        <Td>{_poll.channel}</Td>
                        <Td>{_poll.author}</Td>
                        <Td>{_poll.votes}</Td>
                        <Td>{actionButtons}</Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  )

}

export default PollListings;