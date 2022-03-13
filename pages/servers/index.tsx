import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import {
  Box,
  VStack,
  Image,
  Flex,
  Text,
  Grid,
  Link,
  Spinner,
} from '@chakra-ui/react'

import Govcrumb from 'components/BreadCrumb'

const ServerSelect: NextPage = () => {
  const { data: session } = useSession()
  const [servers, setServers] = useState([])
  const [loading, setLoading] = useState(false)

  const getUserGuilds = useCallback(async () => {
    if (!servers.length) {
      try {
        setLoading(true)
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${session?.accessToken}`,
        }
        const data = await axios.get(
          'https://discord.com/api/users/@me/guilds',
          {
            headers: headers,
          }
        )
        setLoading(false)
        setServers(data.data)
      } catch (e) {
        console.log({ e })
        setLoading(false)
      }
    }
  }, [servers])

  useEffect(() => {
    getUserGuilds()
  }, [getUserGuilds])

  return (
    <Box bg='dark-2' minH='calc(100vh - 60px)' pt='4rem' pb='8rem'>
      <Box bg='dark-1' maxW='2xl' mx='auto' p='2rem 3rem'>
        <Govcrumb />
        <Flex justifyContent='center' alignItems='center'>
          {/* Server Select Box */}
          <Box p={10}>
            <VStack spacing={10}>
              <Text color='white' fontSize='2xl'>
                Select Server
              </Text>
              {loading && <Spinner color='gray.200' />}
            </VStack>
          </Box>
        </Flex>
        {/* Render server icons */}
        {!loading && Boolean(servers.length) && (
          <Grid
            gap='0.5rem'
            templateColumns='repeat(auto-fill,minmax(120px,1fr))'
            w='full'>
            {servers.map((_server: any, idx) => {
              const img = `https://cdn.discordapp.com/icons/${_server.id}/${_server.icon}.png`

              return (
                <VStack
                  p='0.25rem'
                  key={`server-${idx}`}
                  cursor='pointer'
                  role='group'>
                  <Link href={`/servers/${_server.id}`}>
                    <Box p={1} borderRadius='full' _groupHover={{ bg: 'teal' }}>
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
                          w='max-content'>
                          <Text fontSize='medium'>{_server.name}</Text>
                        </Flex>
                      )}
                    </Box>
                  </Link>
                  <Text color='white' overflow='hidden' textOverflow='ellipsis'>
                    {`${
                      _server.name.length > 10
                        ? `${_server.name.slice(0, 10)}...`
                        : _server.name
                    }`}
                  </Text>
                </VStack>
              )
            })}
          </Grid>
        )}
      </Box>
    </Box>
  )
}

export default ServerSelect
