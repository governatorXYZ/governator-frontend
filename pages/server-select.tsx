import type { NextPage } from 'next'
import { useState } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import {
  Box,
  VStack,
  Image,
  Flex,
  Text,
  HStack,
  Grid,
  Link,
} from '@chakra-ui/react'

import { GovBotContext } from '../components/context-provider/provider'
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

  // const onServerSelect = () => {

  // }

  if (servers.length == 0) {
    getUserGuilds()
  }

  return (
    <Box>
      <Box bg='black' minHeight='100vh' pt='30'>
        <Flex justifyContent='center' alignItems='center'>
          {/* Server Select Box */}

                    {/* Render server icons */}
                    <Grid templateColumns='repeat(5, 1fr)' gap={1}>
                      {servers.map((_server: any, idx) => {
                        const img = `https://cdn.discordapp.com/icons/${_server.id}/${_server.icon}.png`

              {/* Render server icons */}
              <Grid templateColumns='repeat(5, 1fr)' gap={1}>
                {servers.map((_server: any, idx) => {
                  const img = `https://cdn.discordapp.com/icons/${_server.id}/${_server.icon}.png`

                  return (
                    <VStack key={`server-${idx}`} cursor='pointer' role='group'>
                      <Box
                        p={1}
                        borderRadius='full'
                        _groupHover={{ bg: 'teal' }}
                      >
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
                            alignItems='center'
                          >
                            <Text fontSize='medium'>
                              {_server.name.slice(0, 2).toUpperCase()}
                            </Text>
                          </Flex>
                        )}
                      </Box>
                      <Text color='white'>{_server.name.slice(0, 15)}</Text>
                    </VStack>
                  )
                })}
              </Grid>
            </VStack>
          </Box>
        )
      }}
    </GovBotContext.Consumer>
  )
}

export default ServerSelect
