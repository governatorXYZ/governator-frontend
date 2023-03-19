import {
  Image,
  Flex,
  Box,
  Link as ChakraLink,
  Heading,
} from '@chakra-ui/react'

interface CommunityProps {
  icon: string;
  id: string;
  name: string;
  onClick?: () => void;
}

const Community = ({ id, icon, name, onClick }: CommunityProps) => {

  const img = `https://cdn.discordapp.com/icons/${id}/${icon}.png`

  return (
    <Flex
      align='center'
      onClick={onClick}
      marginBottom='10px'
      p='5px'
    >
    <Image
      src={img}
      alt={`icon of ${name} discord server`}
      w='36px'
      h='36px'
      borderRadius='full'
    />
    <Heading
      fontSize='16px'
      letterSpacing={'2%'}
      lineHeight='24px'
      ml='10px'
      fontWeight={500}
    >
      {name}
    </Heading>
  </Flex>
  )
}

export default Community
