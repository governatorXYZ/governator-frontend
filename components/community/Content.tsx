import {
  Flex,
  Box,
} from '@chakra-ui/react'

interface LayoutProps {
  children?: JSX.Element;
  short?: boolean
}

const Content = ({ children, short }: LayoutProps) => {
  return (
    <Flex direction='column'>
      {/* bg with skewed radial gradiant */}
      <Box
        h={{
          base: short ? '35px' : '75px',
          md: short ? '35px' : '150px'
        }}
        borderTopLeftRadius={'32px'}
        bgGradient='linear(90deg, mauve.20, teal)'/>
      {children}
    </Flex>
  );
}

export default Content
