import type { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { AddIcon, SettingsIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  VStack,
  Grid,
  Text,
  Flex,
  Image,
  Spinner,
} from '@chakra-ui/react'
import Govcrumb from 'components/BreadCrumb'
import useServers from 'hooks/useServers'
import { FiBarChart } from 'react-icons/fi'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const { loading, currentServer } = useServers()

  const dashboardButtons = [
    {
      title: 'Create Poll',
      icon: <AddIcon />,
      href: `${router.asPath}/polls/create`,
    },
    {
      title: 'Settings',
      icon: <SettingsIcon />,
      href: `${router.asPath}/settings`,
    },
  ]

  const serverImg = `https://cdn.discordapp.com/icons/${currentServer?.id}/${currentServer?.icon}.png`

  return (
    <Box bg='dark-2' minH='calc(100vh - 60px)' pt='4rem' pb='8rem'>
      <Box bg='dark-1' maxW='2xl' mx='auto' p='2rem 3rem'>
        <Flex justifyContent='space-between' alignItems='center'>
          <Govcrumb currentServerName={currentServer?.name} />
          <NextLink href={`${router.asPath}/polls`}>
            <a>
              <Flex
                color='teal.300'
                _hover={{
                  color: 'teal.100',
                }}
                alignItems='center'
                cursor='pointer'
              >
                <Box mr='0.5rem'>
                  <FiBarChart />
                </Box>
                <Text as='span'>Polls</Text>
              </Flex>
            </a>
          </NextLink>
        </Flex>

        <Flex justifyContent='center' alignItems='center'>
          {/* Dashboard Buttons Box */}
          <Box p={10} mt='1rem'>
            <VStack spacing={10}>
              {loading && <Spinner color='gray.200' />}
              {!loading && currentServer && (
                <Box>
                  <Image
                    src={serverImg}
                    alt='user-avatar'
                    borderRadius='full'
                    boxSize='70px'
                    mx='auto'
                  />
                  <Text
                    as='span'
                    display='block'
                    color='gray.200'
                    fontSize='2xl'
                    mt='1rem'
                  >
                    {currentServer.name}
                  </Text>
                </Box>
              )}

              {/* Render server icons */}
              <Grid templateColumns='1fr' gap={6}>
                {dashboardButtons.map((_button, idx) => {
                  return (
                    <Box key={`button-${idx}`} width='100%'>
                      <NextLink href={_button.href}>
                        <Button
                          leftIcon={_button.icon}
                          colorScheme='teal'
                          variant='solid'
                          minW='3xs'
                        >
                          {_button.title}
                        </Button>
                      </NextLink>
                    </Box>
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

export default Dashboard
