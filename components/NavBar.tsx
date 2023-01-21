import { useSession, signIn, signOut } from 'next-auth/react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  chakra,
  HStack,
  VStack,
  Flex,
  Text,
  Link as ChakraLink,
  Image,
  Container,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuGroup,
  MenuDivider,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { AiOutlineCaretDown } from 'react-icons/ai'
import Link from 'next/link'
import { Session } from 'next-auth/core/types'
import { privateBaseAxios } from '../constants/axios';
import { useAtom } from 'jotai';
import { userAtom } from 'atoms';
import { useEffect, useRef } from 'react'

const LoginText = () => {
  return (
    <HStack justifyContent='center' alignItems='center' color='gray.200'>
      {(
        <Text
          as='span'
          cursor='pointer'
          onClick={() => {
            signIn('discord', { callbackUrl: "/dashboard" })
          }}>
          Login
        </Text>
      )}
    </HStack>
  )
}

const MobileDrawer: React.FC<{ session: Session | null }> = ({ session }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null);

  const name = session?.user?.name
  const image = session?.user?.image

  return (
    <>
      {session ? (
        <>
          <Button ref={btnRef} colorScheme='transparent' onClick={onOpen}>
            <HamburgerIcon boxSize={'5'} />
          </Button>
          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent
              bg='gray.700'
            >
              <DrawerCloseButton color='white' />
              <DrawerHeader
                color='gray.200'
                fontSize={'1rem'}
              >                      <Flex
                maxW='max-content'
                alignItems='center'
                color='gray.200'
              >
                  <Image
                    src={image || ''}
                    alt='user-avatar'
                    borderRadius='full'
                    h='30px'
                    mr='0.5rem'
                  />
                  <Text>{name}</Text>
                </Flex></DrawerHeader>
              <DrawerBody
                p='0'
              >
                <Flex
                  h='100%'
                >
                  <VStack
                    color='gray.200'
                    align='flex-start'
                    w='100%'
                  >
                    <Flex
                      borderTop={'2px solid'}
                      borderTopColor='gray.600'
                      direction={'column'}
                      w='100%'
                    >
                      <Box
                        p='16px 1.5rem'
                        w='100%'
                      >
                        <Link href='/dashboard'>
                          <a>
                            <Text as='span'>
                              Dashboard
                            </Text>
                          </a>
                        </Link>
                      </Box>
                      <Box
                        p='16px 1.5rem'
                      >
                        <Link
                          href='/account'>
                          My Account
                        </Link>
                      </Box>
                      <chakra.a
                        p='16px 1.5rem'
                        href='https://governator.notion.site/Governator-Support-Center-2ebc542d891a4fbba9c014cef66a6d64'
                        target='_blank'
                        rel='noreferrer'
                      >
                        Help
                      </chakra.a>
                    </Flex>
                  </VStack>
                </Flex>
              </DrawerBody>
              <DrawerFooter
                justifyContent='flex-start'
              >
                <chakra.a
                  display='block'
                  target='_blank'
                  rel='noreferrer'
                  href='https://forms.gle/yWiYsAmy243rNUvm9'
                  mr='16px'
                >
                  <Button
                    colorScheme='purple'
                  >Feedback</Button>
                </chakra.a>
                <Button
                  onClick={() => {
                    signOut()
                  }}>
                  Logout
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      ) : (<LoginText />)}
    </>
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
          <MenuItem
            alignItems={'flex-end'}
            justifyContent={'stretch'}
          >
            <Link
              href='/account'
              passHref
            >
              <ChakraLink
                display={'block'}
                w='100%'
                _hover={{
                  textDecoration: 'none',
                }}
              >My Account</ChakraLink>
            </Link>
          </MenuItem>
          <MenuItem>
            <chakra.a
              display={'block'}
              w='100%'
              href='https://governator.notion.site/Governator-Support-Center-2ebc542d891a4fbba9c014cef66a6d64'
              target='_blank'
              rel='noreferrer'
            >
              Help
            </chakra.a>
          </MenuItem>
          <MenuItem
            justifyContent={'stretch'}
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

const NavBar = () => {
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
    checkAndCreateUser().then(() => null);

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.discordId])

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
          <Box display={{
            base: 'none',
            md: 'block',
          }}>
            {session ? (
              <HStack color='gray.200' spacing='2rem'>
                <Link href='/dashboard'>
                  <a>
                    <Text as='span' fontSize='15px' fontWeight='500'>
                      Dashboard
                    </Text>
                  </a>
                </Link>
                <UserAvatar session={session} />
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://forms.gle/yWiYsAmy243rNUvm9'
                >
                  <Button
                    colorScheme='purple'
                  > Feedback
                  </Button>
                </a>
              </HStack>
            ) : (
              <LoginText />
            )}
          </Box>
          <Box display={{
            base: 'block',
            md: 'none'
          }}>
            <MobileDrawer session={session} />
          </Box>
        </Flex>
      </Container>
    </Flex>
  )
}

export default NavBar
