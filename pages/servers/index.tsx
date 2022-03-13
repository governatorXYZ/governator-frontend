import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  VStack,
  Image,
  Flex,
  Text,
  Grid,
  Link,
} from '@chakra-ui/react'
 
import Govcrumb from 'components/BreadCrumb'

const ServerSelect: NextPage = () => {
  const { data: session } = useSession()
  const [servers, setServers] = useState([])

  const getUserGuilds = async () => {
    try {
      console.log('getting user guilds')
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${session?.accessToken}`,
      }

      const data = await axios.get('https://discord.com/api/users/@me/guilds', {
        headers: headers,
      })
      console.log({ data })

      setServers(data.data)
    } catch (e) {
      console.log({ e })
    }
  }

  if (servers.length == 0) {
    getUserGuilds()
  }

  return (
    <Box bg='dark-2' minH='calc(100vh - 90px)' pt='4rem' pb='8rem'>
      <Box bg='dark-1' maxW='2xl' mx='auto' p='2rem 3rem'>
        <Govcrumb />

        <Flex justifyContent='center' alignItems='center'>
          {/* Server Select Box */}

          <Box p={10}>
            <VStack spacing={10}>
              <Text color='white' fontSize='2xl'>
                Select Server
              </Text>

              {/* Render server icons */}
              <Grid templateColumns='repeat(5, 1fr)' gap={1}>
                {servers.map((_server: any, idx) => {
                  const img = `https://cdn.discordapp.com/icons/${_server.id}/${_server.icon}.png`

                  return (
                    <VStack key={`server-${idx}`} cursor='pointer' role='group'>
                      <Link
                        href={`/servers/${_server.id}`}>
                        <Box
                          p={1}
                          borderRadius='full'
                          _groupHover={{ bg: 'teal' }}>
                          {_server.icon ? (
                            <Image
                              src={img}
                              alt='user-avatar'
                              borderRadius='full'
                              boxSize='50px'
                            />
                          ) : (
                            <Flex
                              borderRadius='full'
                              background='grey'
                              boxSize='50px'
                              justifyContent='center'
                              alignItems='center'>
                              <Text fontSize='medium'>
                                {_server.name.slice(0, 2).toUpperCase()}
                              </Text>
                            </Flex>
                          )}
                        </Box>
                      </Link>
                      <Text color='white'>{_server.name.slice(0, 15)}</Text>
                    </VStack>
                  )
                })}
              </Grid>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default ServerSelect
