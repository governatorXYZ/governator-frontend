import {
  Flex,
  Link as ChakraLink,
  Box,
} from '@chakra-ui/react'

interface LayoutProps {
  children?: JSX.Element
}

const Content = ({ children }: LayoutProps) => {
  return (
    <Flex direction='column'>
      {/* bg with skewed radial gradiant */}
      <Box h='150px' borderTopLeftRadius={'32px'} bg='linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%), linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%), linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%), linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%), linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%), linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%), linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%), linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%), linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%), linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%), linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%), linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%), linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%), linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)' />
      {children}
    </Flex>
  );
}

export default Content
