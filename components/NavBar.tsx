import { useSession, signIn, signOut } from 'next-auth/react'
import {
  Box,
  HStack,
  Flex,
  Text,
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
import getConfig from 'next/config'
import Link from 'next/link'

const LoginText: React.FC = () => {
  const { publicRuntimeConfig } = getConfig()

  return (
    <HStack justifyContent='center' alignItems='center' color='gray.200'>
      {publicRuntimeConfig.WAITLIST_MODE ? (
        <Text
          as='a'
          href='https://airtable.com/shrWMfKtVfdBvv5dL'
          target='_blank'
        >
          Join the waitlist
        </Text>
      ) : (
        <Text
          as='span'
          cursor='pointer'
          onClick={() => {
            signIn('discord')
          }}
        >
          Login
        </Text>
      )}
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
      <MenuList color='gray.800'>
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
              <Link href='/'>governator.xyz</Link>
            </Text>
          </Box>
          {/* User Display */}
          <Box>
            {session ? (
              <HStack color='gray.200' spacing='2rem'>
                <Link href='/servers'>
                  <a>
                    <Text as='span' fontSize='15px' fontWeight='500'>
                      Servers
                    </Text>
                  </a>
                </Link>
                <UserAvatar session={session} />
              </HStack>
            ) : (
              <LoginText />
            )}
          </Box>
        </Flex>
      </Container>
    </Flex>
  )
}

export default NavBar
