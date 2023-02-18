import { Button, Flex, Link, Image, Box } from '@chakra-ui/react'
import SVGWall from '../SVGWall'
import { FaDiscord } from 'react-icons/fa'
import { FiTwitter } from 'react-icons/fi'

type LinkList = Array<LinkListItem>;

type LinkListItem = {
  name: string;
  href: string;
};

const links: LinkList = [
  {
    name: 'Privacy',
    href: 'privacy',
  },
  // {
  //   name: 'Terms',
  //   href: 'terms',
  // },
  // {
  //   name: 'Contact',
  //   href: 'contact',
  // },
  // {
  //   name: 'Team',
  //   href: 'team'
  // }
];

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
        <Flex
          direction='column'
          align='flex-end'
        >
          <Flex>
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
          {links.map(({
            name,
            href
          }: LinkListItem) => (
            <Link
              key={name}
              href={href}
            >
              <Box
                p='.5em 1em'
              >
                {name}
              </Box>
            </Link>)
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default Footer
