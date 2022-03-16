import { Box, Text } from '@chakra-ui/react'

interface I_CardProps {
  title: string
  value: string
}

const Card: React.FC<I_CardProps> = ({ ...props }) => {
  return (
    <Box 
        background='white'
        maxW="sm" 
        width={60}
        borderWidth="1px" 
        borderRadius="lg" 
        overflow="hidden"
        p="4"
        >
      <Text
        as='span'
        fontSize='md'
        display='block'
        mb='0.5rem'
        fontWeight='700'>
            {props.title}
        </Text>
      <Text
        as='span'
        fontSize='md'
        display='block'
        fontWeight='300'>
            {props.value}
        </Text>
    </Box>
  )
}

export default Card
