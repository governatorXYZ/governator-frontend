import {
  Icon,
  Box,
  Flex,
  Image,
  Button,
  Heading,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCommunities } from 'contexts/CommunitiesContext'
import { IoMdAddCircleOutline } from 'react-icons/io';
import Community from './Community'

interface SidenavProps {
  children?: JSX.Element
}

const Sidenav = ({ children }: SidenavProps) => {
  const { communities } = useCommunities();

  const router = useRouter();

  const list = communities.length > 0 ? communities.map(
    (community, i) => (
      <Community
        key={community.id}
        name={community.name}
        id={community.id}
        icon={community.icon}
        onClick={() => router.push(`/community/${community.id}`)}
        active={router.asPath.includes(community.id)}
      />)) : <Box>No communities</Box>
  
  return (
    <Flex
      direction='column'
      bg='#2A303A'
      w='277px'
      px='25px'
      py='20px'
      color='#fff'
      fontFamily={'Manrope'}
      flexShrink={0}
    >
      <Flex
        align='center'
        borderBottom="0.5px solid"
        borderBottomColor={'#7F9AC7'}
        pb='30px'
        mb='20px'
      >
        <Image
          src='/images/gov-bot.jpeg'
          alt='Governator'
          w='50px'
          h='50px'
          borderRadius='full'
        />
        <Heading
          fontSize='24px'
          ml='20px'
          fontWeight={500}
        >
          Governator
        </Heading>
      </Flex>
      <Box mb='13px'>
        {list}
      </Box>
      <Box>
        <Button
          leftIcon={<Icon w={8} h={8} color={"#7F9AC7"} as={IoMdAddCircleOutline}/>}
          bg='#2C3748'
          color='#7F9AC7'
          w='100%'
          justifyContent='flex-start'
          h='50px'
          flexShrink={0}
          my='0'
        >
          Add a server
        </Button>
      </Box>
    </Flex>
  )
}

export default Sidenav;
