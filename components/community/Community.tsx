import {
  Image,
  Flex,
  Heading,
} from '@chakra-ui/react'

interface CommunityProps {
  icon: string;
  id: string;
  name: string;
  active: boolean;
  onClick?: () => void;
}

const Community = ({ id, icon, name, active, onClick }: CommunityProps) => {

  const img = `https://cdn.discordapp.com/icons/${id}/${icon}.png`

  return (
    <Flex
      align='center'
      onClick={onClick}
      marginBottom='10px'
      p='5px'
      bg={active ? '#303F56' : 'transparent'}
      borderTopLeftRadius={active ? '5px' : 'base'}
      borderBottomLeftRadius={active ? '5px' : 'base'}
      borderRight={active ? '2px solid' : 'none'}
      borderRightColor={'#D9D9D9'}
      _hover={{
        bg: '#303F56',
        borderTopLeftRadius: '5px',
        borderBottomLeftRadius: '5px',
        borderRight: '2px solid',
        borderRightColor: '#D9D9D9'
      }}
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
      display={{
        base: 'none',
        md: 'unset'
      }}
    >
      {name}
    </Heading>
  </Flex>
  )
}

export default Community
