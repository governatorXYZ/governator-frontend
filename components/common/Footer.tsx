import { Button, Flex, Link, Image } from '@chakra-ui/react'
import SVGWall from '../SVGWall'
import { FaDiscord } from 'react-icons/fa'
import { FiTwitter } from 'react-icons/fi'

const Footer: React.FC = () => {
  return (
    <>
      <SVGWall />
      <Flex
            backgroundColor='black'
            h={{
              base: 'fit-content',
              lg: '240px'
            }}
            alignItems='center'
            justifyContent='space-between'
            p='40px'
            px='60px'
            flexDir={{
              base: 'column',
              lg: 'row',
            }}
          >
        <Image
          src='./images/bankless.png'
          alt='BanklessDAO'
          alignSelf='center'
        />
        <Flex gap='8px'>
          <Link href='https://discord.com/invite/bankless'>
            <a>
              <Button
                variant='ghost'
                _hover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                <FaDiscord fontSize='20px' />
              </Button>
            </a>
          </Link>
          <Link href='https://twitter.com/governatorxyz'>
            <a>
              <Button
                variant='ghost'
                _hover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                <FiTwitter fontSize='20px' />
              </Button>
            </a>
          </Link>
        </Flex>
      </Flex>
    </>
  )
}

export default Footer
