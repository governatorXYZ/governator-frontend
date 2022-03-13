import type { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router'
import { CalendarIcon, AddIcon, SettingsIcon } from '@chakra-ui/icons';
import { Box, Button, VStack, Grid, Text, Flex, Link } from '@chakra-ui/react';
import Govcrumb from 'components/BreadCrumb';


const Dashboard: NextPage = () => {

  const router = useRouter()

  const dashboardButtons = [
    {
      title: 'Create Event',
      icon: <CalendarIcon />,
      href: '#',
      // href: '`${router.asPath}/events/create`',
    },
    {
      title: 'Create Poll',
      icon: <AddIcon />,
      href: `${router.asPath}/polls/create`,
    },
    {
      title: 'Create Settings',
      icon: <SettingsIcon />,
      href: '#',
    },
  ]
  

  return (
    <Box bg='dark-2' minH='calc(100vh - 90px)' pt='4rem' pb='8rem'>
      <Box bg='dark-1' maxW='2xl' mx='auto' p='2rem 3rem'>
        <Govcrumb />
        <Flex justifyContent='center' alignItems='center'>
          {/* Dashboard Buttons Box */}
          <Box p={10}>
            <VStack spacing={10}>
              <Text color='white' fontSize='2xl'>
                Server Name
              </Text>

              {/* Render server icons */}
              <Grid templateColumns='1fr' gap={6}>
                {dashboardButtons.map((_button, idx) => {
                  return (
                    <Box key={`button-${idx}`} width='100%'>
                      <NextLink href={_button.href} >
                        <Button
                          leftIcon={_button.icon}
                          colorScheme='teal'
                          variant='solid'
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
