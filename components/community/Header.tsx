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
      justify={{
        base: 'space-between',
        md: 'flex-end'
      }}
      align='center'
      p='15px 30px'
      bg='#2A303A'
      py={{
        base: '0px',
        md: '15px'
      }}
      h={{
        base: '70px',
        md: '40px'
      }}
    >
      <Flex
        display={{
          base: 'flex',
          md: 'flex',
          lg: 'none',
        }}
      >
        <Button
          bg='#303F56'
          _hover={{
            bg: 'transparent'
          }}
          _active={{
            bg: 'transparent'
          }}
          onClick={onClick}
          w={{
            base: '40px',
            md: 'fit-content'
          }}
          h='40px'
          p='0'
        >
          <Image
            src='/images/menu-03.svg'
            alt='log out icon'
            width='18px'
            height='18px'
            flexShrink={0}
          />
        </Button>
      </Flex>
      <Flex>
        <Flex
          borderRadius='full'
          bg='#303F56'
          h='40px'
          w='40px'
          color='#fff'
          align='center'
          justify='center'
        >
          <Image
            src={user?.image ?? 'images/user-01.svg'}
            alt='logo'
            w='20px'
            h='20px'
            borderRadius={'full'}
            mr={{
              base: '0',
              md: '6px'
            }}
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
    </Flex>
  )
}

export default Header
