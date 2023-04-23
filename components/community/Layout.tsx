import { useSession, signOut } from 'next-auth/react'
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

interface LayoutProps {
  children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpenMobileNav = () => onOpen();
  const { data: session } = useSession();

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
              md: '277px'
            }}
          >
            <Header
              user={session?.user}
              onSignOut={signOut}
              onClick={handleOpenMobileNav}
            />
            <Content>
              {children}
            </Content>
          </Box>
        </Flex>
      </RouteGuard>
    </CommunitiesProvider>
  )
}

export default Layout
