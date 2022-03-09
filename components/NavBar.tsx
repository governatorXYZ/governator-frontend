import { useSession, signIn, signOut } from 'next-auth/react'
import {
  Box,
  HStack,
  VStack,
  Flex,
  Text,
  Link,
  Image,
  Container,
} from '@chakra-ui/react'

const NavBar: React.FC = () => {
  const { data: session } = useSession()

  const renderLoginText = () => {
    return (
      <HStack justifyContent='center' alignItems='center'>
        <Link
          color='gray.200'
          href='#'
          onClick={() => {
            signIn('discord')
          }}
        >
          Login
        </Link>
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
          <Link
            color='gray.500'
            href='#'
            onClick={() => {
              signOut()
            }}
          >
            Logout
          </Link>
        </VStack>
      </HStack>
    )
  }

  return (
    <Box bg='gray.700' py={4} h='60px'>
      <Container maxW='container.xl'>
        <Flex justifyContent='space-between' alignItems='center'>
          <Box>
            <Text
              as='span'
              color='gray.200'
              fontSize='xl'
              className='roboto-mono'
            >
              governator.xyz
            </Text>
          </Box>
          {/* User Display */}
          <Box ml='auto'>
            {session ? renderUserAvatar() : renderLoginText()}
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default NavBar
