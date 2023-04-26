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
import { useAtom } from 'jotai';
import { writableLoadableAtom } from 'atoms';
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { LoadableWithData, Session } from 'interfaces';
import _ from 'lodash'
import utils from '../constants/utils'


const LOGIN_PATH = `/proxy/auth/login`;
const LOGOUT_PATH = `/proxy/auth/logout`;

const LoginText = (params: { url: string }) => {
  return (
    <HStack justifyContent='center' alignItems='center' color='gray.200'>
      {(
        <Text
          as='span'
          cursor='pointer'
          ml={{
            base: '8px',
          }}
        >
          <Link href={params.url}>Login</Link>
        </Text>
      )}
    </HStack>
  )
}

const MobileDrawer: React.FC<Session> = (session) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null);
  const router = useRouter();

  const name = session.oauthProfile.discord_username;
  const image = session.oauthProfile.avatar;

  useEffect(() => {
    router.events.on('beforeHistoryChange', onClose)

    return () => {
      router.events.off('beforeHistoryChange', onClose)
    }
  }, [])

  return (
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
                        <Link href='/dashboard' passHref>
                            <Text as='span'>
                              Dashboard
                            </Text>
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
                        href='https://governator.notion.site/Governator-Support-Center-2ebc542d891a4fbba9c014cef66a6d64'
                        onClick={() => { onClose() }}
                        p='16px 1.5rem'
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
                  href='https://forms.gle/yWiYsAmy243rNUvm9'
                  onClick={() => { onClose() }}
                  rel='noreferrer'
                  display='block'
                  target='_blank'
                  mr='16px'
                >
                  <Button
                    colorScheme='purple'
                  >Feedback</Button>
                </chakra.a>
                <Text>
                  <Link href={LOGOUT_PATH} passHref prefetch={false}>Logout</Link>
                </Text>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
  )
}

const UserAvatar: React.FC<Session> = (session) => {
  const name = session.oauthProfile.discord_username;
  const image = session.oauthProfile.avatar;

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
              {/* <ChakraLink
                display={'block'}
                w='100%'
                _hover={{
                  textDecoration: 'none',
                }}
              >My Account</ChakraLink> */}
              My Account
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
          >
            <Link href={LOGOUT_PATH} passHref prefetch={false}>Logout</Link>
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

const NavBar = () => {
  const [loadable] = useAtom(writableLoadableAtom)

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
            {utils.isAuthenticated(loadable) ? (
              <HStack color='gray.200' spacing='2rem'>
                <Link href='/dashboard' passHref>
                    <Text as='span' fontSize='15px' fontWeight='500'>
                      Dashboard
                    </Text>
                </Link>
                <UserAvatar {...(loadable as LoadableWithData).data} />
                <Link
                  href='https://forms.gle/yWiYsAmy243rNUvm9'
                  passHref
                >
                  <Button
                    colorScheme='purple'
                  > Feedback
                  </Button>
                </Link>
              </HStack>
            ) : (
              <LoginText url={LOGIN_PATH}/>
            )}
          </Box>
          <Box display={{
            base: 'block',
            md: 'none'
          }}>
            {utils.isAuthenticated(loadable) ? (<MobileDrawer {...(loadable as LoadableWithData).data} />) : (<LoginText url={LOGIN_PATH}/>) }
          </Box>
        </Flex>
      </Container>
    </Flex>
  )
}

export default NavBar
