import { Text, TextProps } from '@chakra-ui/react'

const ThemedFormErrorMessage: React.FC<TextProps> = ({
  children,
  ...props
}) => (
  <Text
    as='span'
    fontWeight='500'
    fontSize='12px'
    color='red.400'
    display='block'
    {...props}
  >
    {children}
  </Text>
)

export default ThemedFormErrorMessage
