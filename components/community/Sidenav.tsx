import {
  Heading,
  Button,
  Image,
  Icon,
  Flex,
  Box,
  chakra
} from '@chakra-ui/react'
import { useCommunities } from 'contexts/CommunitiesContext';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { useRouter } from 'next/router'
import Community from './Community'

interface SidenavProps {
  children?: JSX.Element;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Sidenav = ({ children, ...styles }: SidenavProps) => {
  const { communities } = useCommunities();

  const router = useRouter();

  const list = communities.length > 0 ? communities.map(
    (community) => (
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
      position='fixed'
      flexShrink={0}
      bg='#2A303A'
      color='#fff'
      h='100vh'
      w={{
        base: '96px',
        md: '277px'
      }}
      px='25px'
      py='20px'
      display={{
        base: 'none',
        sm: 'flex',
        md: 'flex'
      }}
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
          h='auto'
          flexShrink={0}
          borderRadius='full'
        />
        <Heading
          fontSize='24px'
          ml='20px'
          fontWeight={500}
          display={{
            base: 'none',
            md: 'block'
          }}
        >
          Governator
        </Heading>
      </Flex>
      <Box mb='13px'>
        {list}
      </Box>
      <Box>
        <Button
          as={Flex}
          leftIcon={
            <Icon
            w={8}
            h={8}
            color={"#7F9AC7"}
            as={IoMdAddCircleOutline}
          />
          }
          bg='#2C3748'
          color='#7F9AC7'
          w={{
            base: '50px',
            md: '100%'
          }}
          alignItems='center'
          justifyContent={{
            base: 'center',
            md: 'flex-start'
          }}      
          h='50px'
          my='0'
        >
          <chakra.span display={{
            base: 'none',
            md: 'inline'
          }}>
            Add a server
          </chakra.span>
        </Button>
      </Box>
    </Flex>
  )
}

export default Sidenav;
