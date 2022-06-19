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
import { Session } from 'next-auth/core/types'
import { privateBaseAxios } from '../constants/axios';
import { useAtom } from 'jotai';
import { userAtom } from 'atoms';
import { useEffect } from 'react'

const LoginText: React.FC = () => {

  const waitlistDisabled = process.env.NEXT_PUBLIC_WAITLIST_ENABLED !== 'true'

  return (
    <HStack justifyContent='center' alignItems='center' color='gray.200'>
      {!waitlistDisabled ? (
        <Text
          as='a'
          href='https://airtable.com/shrWMfKtVfdBvv5dL'
          target='_blank'>
          Join the waitlist
        </Text>
      ) : (
        <Text
          as='span'
          cursor='pointer'
          onClick={() => {
            signIn('discord')
          }}>
          Login
        </Text>
      )}
    </HStack>
  )
}

const UserAvatar: React.FC<{ session: Session }> = ({ session }) => {
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
          <MenuItem>
            <Link href='/account'>
              My Account
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              signOut()
            }}>
            Logout
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

const NavBar: React.FC = () => {
  const { data: session } = useSession()
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {

    async function checkAndCreateUser() {
      const discordId = session?.discordId;
      if (!discordId) {
        return
      }

      /* Check if user already exists in database */
      const dicordUserRes = await privateBaseAxios.get(`account/discord/get-by-account-id/${discordId}`)
      const discordUser = dicordUserRes.data

      /* Create user if does not already exist */
      if (discordUser) {
        setUser({
          ...user,
          userId: discordUser.user_id
        });
        return
      }

      const data = {
        _id: discordId,
        discord_username: session?.name
      }
      const userXhr = await privateBaseAxios.post('/account/discord/create', data);
      const newUser = userXhr.data;
      setUser({
        ...user,
        userId: newUser.user_id
      });
    }
    checkAndCreateUser();

  },[session?.name, session?.discordId])

  return (
    <Flex bg='gray.700' h='60px'>
      <Container maxW='container.xl' my='auto'>
        <Flex justifyContent='space-between' alignItems='center'>
          <Box>
            <Text
              as='span'
              color='gray.200'
              fontSize='lg'
              className='roboto-mono'>
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
