import type { NextPage } from 'next'
import { Box, VStack, Image, Flex, Text, HStack } from '@chakra-ui/react'

const servers = [
  {
    img: '/images/gov-bot.jpeg',
    name: 'Server1',
  },
  {
    img: '/images/gov-bot.jpeg',
    name: 'Server2',
  },
  {
    img: '/images/gov-bot.jpeg',
    name: 'Server3',
  },
  {
    img: '/images/gov-bot.jpeg',
    name: 'Server4',
  },
]

const ServerSelect: NextPage = () => {
  return (
    <Box>
      <Box bg='black' h='100vh' pt='30'>
        <Flex justifyContent='center' alignItems='center'>
          {/* Server Select Box */}

          <Box bg='gray.700' p={10}>
            <VStack spacing={10}>
              <Text color='white' fontSize='2xl'>
                Select Server
              </Text>

              {/* Render server icons */}
              <HStack spacing={6}>
                {servers.map((_server, idx) => {
                  return (
                    <VStack key={`server-${idx}`} cursor='pointer' role='group'>
                      <Box
                        p={1}
                        borderRadius='full'
                        _groupHover={{ bg: 'teal' }}
                      >
                        <Image
                          src={_server.img}
                          alt='user-avatar'
                          borderRadius='full'
                          boxSize='50px'
                        />
                      </Box>
                      <Text color='white'>{_server.name}</Text>
                    </VStack>
                  )
                })}
              </HStack>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default ServerSelect
