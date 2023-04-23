import {
  Flex,
  Box,
} from '@chakra-ui/react'

interface LayoutProps {
  children?: JSX.Element
}

const Content = ({ children }: LayoutProps) => {
  return (
    <Flex direction='column'>
      {/* bg with skewed radial gradiant */}
      <Box
        h='150px'
        borderTopLeftRadius={'32px'}
        bgGradient='linear(90deg, mauve.20, teal)'/>
      {children}
    </Flex>
  );
}

export default Content
