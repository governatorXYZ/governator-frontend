import {
  Button,
  Image,
  Flex,
  Text,
} from '@chakra-ui/react'

interface HeaderProps {
  children?: JSX.Element;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  onSignOut?: () => void;
  onClick?: () => void;
}

const Header = ({
  user,
  onSignOut,
  onClick
}: HeaderProps) => {
  
  return (
    <Flex
      boxSizing='content-box'
      justify={'flex-end'}
      p='15px 30px'
      bg='#2A303A'
      py='15px'
      h='40px'
    >
      <Flex>
        <Button
          onClick={onClick}
        >
          <Image
            src='/images/log-out-04.svg'
            alt='log out icon'
            flexShrink={0}
          />
        </Button>
      </Flex>
      <Flex
        borderRadius='full'
        bg='#303F56'
        h='40px'
        color='#fff'
        align='center'
        px='1em'
      >
        <Image
          src={user?.image ?? 'images/user-01.svg'}
          alt='logo'
          w='20px'
          h='20px'
          borderRadius={'full'}
          mr='6px'
        />
        <Text
          display={{
            base: 'none',
            md: 'block',
          }}
        >
          {user?.name}
        </Text>
      </Flex>
      <Button
        borderRadius={'full'}
        h='40px'
        w='40px'
        p='0'
        flexShrink={0}
        bg='#303F56'
        color='#FFF'
        ml='1em'
        onClick={onSignOut}
      >
        <Image
          src='/images/log-out-04.svg'
          alt='log out icon'
          flexShrink={0}
        />
      </Button>
    </Flex>
  )
}

export default Header
