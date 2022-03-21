import { useSession, signIn, signOut } from "next-auth/react"
import { Box, HStack, VStack, Flex, Text, Link, Image } from '@chakra-ui/react'

const NavBar: React.FC = () => {
  const { data: session } = useSession()

  const renderLoginText = () => {
    return (
      <HStack justifyContent='center' alignItems='center'>
        <Link color='gray.500' href='#' onClick={() => {signIn('discord')}}>Login</Link>
      </HStack>
    )
  }

  const renderUserAvatar = () => {

    const name = session?.user?.name
    const image = session?.user?.image

    return (
      <HStack>
        <Image
          src={image || ''}
          alt='user-avatar'
          borderRadius='full'
          boxSize='50px'
        />
        <VStack>
          <Text color='white'>{name}</Text>
          <Link color='gray.500' href='#' onClick={() => {signOut()}}>
            Logout
          </Link>
        </VStack>
      </HStack>
    )
  }

  return (
    <Box bg='gray.700' px={10} py={4}>
      <Flex alignItems='center'>
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
        <Box ml='auto'>
          {session ? renderUserAvatar() : renderLoginText()}
        </Box>
      </Flex>
    </Box>
  )

 
}

export default NavBar
