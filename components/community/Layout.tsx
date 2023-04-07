import { useSession, signOut } from 'next-auth/react'
import {
  Box,
  Flex,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { CommunitiesProvider } from 'contexts/CommunitiesContext'
import Sidenav from './Sidenav'
import Header from './Header'
import Content from './Content'
import RouteGuard from 'components/RouteGuard'

interface LayoutProps {
  children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
  const {
    data: session,
    status,
  } = useSession();
  
  return (
    <CommunitiesProvider>
      <RouteGuard>
        <Flex bg='#2A303A' justify='stretch' fontFamily={'Manrope'}>
          <Sidenav />
          <Box flexGrow={2} ml='277px'>
            <Header user={session?.user} onSignOut={signOut} />
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
