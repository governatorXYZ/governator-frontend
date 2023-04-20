import type { NextPage } from 'next'
import { Box, VStack, Image, Flex, Text, Grid, Spinner } from '@chakra-ui/react'
import useServers from 'hooks/useServers'
import Head from 'next/head'

import Link from 'next/link'
// import { useEffect } from 'react'
// import { loadableSessionAtom } from 'atoms'
// import { useAtom } from 'jotai'

const ServerSelect: NextPage = () => {
  const { servers, loading } = useServers()
  // const [session, refreshSession] = useAtom(loadableSessionAtom)
  // useEffect(() => {
  //   refreshSession();
  //   // console.log(session)
  // },[])

  return (
    <Flex
      bg='dark-2'
      minH='calc(100vh - 60px)'
      pt='4rem'
      pb='8rem'
      justifyContent={'center'}
    >
      <Head>
        <title>Governator | Servers</title>
      </Head>
      <Box
        bg='dark-1'
        flexBasis={'2xl'}
        maxW='2xl'
        p={{ 
          base: '2rem 1rem',
          sm: '2rem 3rem' 
        }}
        mx='32px'
      >
        {/* <Govcrumb /> */}
        <Flex justifyContent='center' alignItems='center'>
          {/* Server Select Box */}
          <Box p={{
            base: '2.5rem 0',
            sm: '2.5rem'
          }}>
            <VStack spacing={10}>
              <Text
                color='white'
                fontSize='2xl'>
                Select Community
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
            w='full'
          >
            {servers.map((_server, idx) => {
              const img = `https://cdn.discordapp.com/icons/${_server.id}/${_server.icon}.png`

              return (
                <VStack
                  p='0.25rem'
                  key={`server-${idx}`}
                  cursor='pointer'
                  role='group'
                >
                  <Link href={`/community/${_server.id}`} passHref>
                    <Box
                      p={1}
                      borderRadius='full'
                      _groupHover={{ bg: 'blue.500' }}
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
                  </Link>
                  <Text color='white' overflow='hidden' textOverflow='ellipsis'>
                    {`${
                      _server.name.length > 15
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
    </Flex>
  )
}

export default ServerSelect
