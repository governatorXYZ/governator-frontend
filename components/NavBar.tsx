import { Box, HStack, VStack, Flex, Text, Link, Image } from '@chakra-ui/react'

const userDetails = {
  img: '/images/gov-bot.jpeg',
  name: 'Ken#7046',
}

const NavBar: React.FC = () => {
  return (
    <Box bg='dark-1' px={10} py={4} h='90px'>
      <Flex justifyContent='space-between' alignItems='center'>
        {/* Logo */}
        <Box>
          <Image
            src='/images/gov-bot.jpeg'
            alt='logo'
            boxSize='50px'
            objectFit='cover'
          />
        </Box>

        {/* User Display */}
        <Box>
          <HStack>
            <Image
              src={userDetails.img}
              alt='user-avatar'
              borderRadius='full'
              boxSize='50px'
            />
            <VStack>
              <Text color='white'>{userDetails.name}</Text>
              <Link color='gray.500' href='#'>
                Logout
              </Link>
            </VStack>
          </HStack>
        </Box>
      </Flex>
    </Box>
  )
}

export default NavBar
