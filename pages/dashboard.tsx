import type { NextPage } from 'next'
import { CalendarIcon, AddIcon, SettingsIcon } from '@chakra-ui/icons'
import { Box, Button, VStack, Grid, Text, Flex } from '@chakra-ui/react'

const dashboardButtons = [
  {
    title: 'Create Event',
    icon: <CalendarIcon />,
    href: '#',
  },
  {
    title: 'Create Poll',
    icon: <AddIcon />,
    href: '#',
  },
  {
    title: 'Create Settings',
    icon: <SettingsIcon />,
    href: '#',
  },
]

const Dashboard: NextPage = () => {
  return (
    <Box>
      <Box h='100vh' pt='30'>
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
                    <Button
                      key={`button-${idx}`}
                      leftIcon={_button.icon}
                      colorScheme='teal'
                      variant='solid'
                      href={_button.href}
                    >
                      {_button.title}
                    </Button>
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
