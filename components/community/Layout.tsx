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
      <Flex bg='#2A303A' justify='stretch'>
        <Sidenav />
        <Box flexGrow={2}>
          <Header user={session?.user} onSignOut={signOut} />
          <Content>
            {children}
          </Content>
        </Box>
      </Flex>
    </CommunitiesProvider>
  )
}

export default Layout
