import {
  Image,
  Flex,
  Heading,
} from '@chakra-ui/react'

interface CommunityProps {
  icon: string;
  name: string;
  active: boolean;
  onClick?: () => void;
}

const Dashboard = ({ icon, name, active, onClick }: CommunityProps) => {
  return (
    <Flex
      align='center'
      onClick={onClick}
      marginBottom='10px'
      p='5px 15px'
      py='15px'
      mb='20px'
      bg={active ? '#303F56' : 'transparent'}
      borderY='1px solid'
      borderColor='#7F9AC7'
      _hover={{
        bg: '#303F56',
      }}
    >
    <Image
      src={icon}
      alt={`${name} icon`}
      w='24px'
      h='24px'
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
      Dashboard
    </Heading>
  </Flex>
  )
}

export default Dashboard
