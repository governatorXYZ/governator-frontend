import {
  Box,
  Flex,
  useDisclosure
} from '@chakra-ui/react'
import { CommunitiesProvider } from 'contexts/CommunitiesContext'
import Sidenav from './Sidenav'
import Header from './Header'
import Content from './Content'
import RouteGuard from 'components/RouteGuard'
import MobileNav from './MobileNav'
import { useSession } from 'hooks'
import { useRouter } from 'next/router'

interface LayoutProps {
  children: JSX.Element;
  short?: boolean
}

const Layout = ({ children, short }: LayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpenMobileNav = () => onOpen();
  const { session } = useSession();
  const router = useRouter();

  const signOut = async () => {
    try {
      router.push('/proxy/auth/logout');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CommunitiesProvider>
      <RouteGuard>
        <Flex bg='#2A303A' justify='stretch' fontFamily={'Manrope'}>
          <Sidenav />
          <MobileNav onClose={onClose} open={isOpen} />
          <Box
            flexGrow={2}
            ml={{
              base: '0px',
              sm: '96px',
              md: '277px'
            }}
          >
            <Header
              user={session?.user}
              onSignOut={signOut}
              onClick={handleOpenMobileNav}
            />
            <Content short={short}>
              {children}
            </Content>
          </Box>
        </Flex>
      </RouteGuard>
    </CommunitiesProvider>
  )
}

export default Layout
