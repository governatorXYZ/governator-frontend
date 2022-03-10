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
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { AiOutlineCaretDown } from 'react-icons/ai'

const LoginText: React.FC = () => {
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

const UserAvatar: React.FC<{ session: any }> = ({ session }) => {
  const name = session?.user?.name
  const image = session?.user?.image

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        _hover={{
          backgroundColor: 'transparent',
        }}
        _active={{
          backgroundColor: 'transparent',
        }}
        icon={
          <Flex maxW='max-content' alignItems='center' color='gray.200'>
            <Image
              src={image || ''}
              alt='user-avatar'
              borderRadius='full'
              h='30px'
              mr='0.5rem'
            />
            <AiOutlineCaretDown fontSize='12px' />
          </Flex>
        }
        variant='ghost'
      />
      <MenuList>
        <MenuGroup title={`Signed in as ${name}`} fontWeight='400'>
          <MenuDivider />
          <MenuItem
            onClick={() => {
              signOut()
            }}
          >
            Logout
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

const NavBar: React.FC = () => {
  const { data: session } = useSession()

  return (
    <Flex bg='gray.700' h='60px'>
      <Container maxW='container.xl' my='auto'>
        <Flex justifyContent='space-between' alignItems='center'>
          <Box>
            <Text
              as='span'
              color='gray.200'
              fontSize='lg'
              className='roboto-mono'
            >
              governator.xyz
            </Text>
          </Box>
          {/* User Display */}
          <Box>
            {session ? <UserAvatar session={session} /> : <LoginText />}
          </Box>
        </Flex>
      </Container>
    </Flex>
  )
}

export default NavBar
