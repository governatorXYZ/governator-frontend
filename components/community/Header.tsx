import {
  Flex,
  Box,
  Link as ChakraLink,
} from '@chakra-ui/react'

interface HeaderProps {
  children?: JSX.Element
}

const Header = (props: HeaderProps) => {
  return (
    <Flex
      boxSizing='content-box'
      justify={'flex-end'}
      p='15px 30px'
      bg='#2A303A'
      py='15px'
      h='40px'
    >
      <Box h='40px' w='100px' bg='red' />
    </Flex>
  )
}

export default Header
