import { Button, Flex, Link, Image, Box } from '@chakra-ui/react'
import SVGWall from '../SVGWall'
import { FaDiscord } from 'react-icons/fa'
import { FiTwitter } from 'react-icons/fi'
import { SiNotion } from 'react-icons/si'

type LinkList = Array<LinkListItem>;

type LinkListItem = {
  name: string;
  href: string;
  icon?: JSX.Element;
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
  {
    name: 'Team',
    href: 'team'
  }, {
    name: 'help',
    href: 'https://governator.notion.site/Governator-Support-Center-2ebc542d891a4fbba9c014cef66a6d64'
  }
];

const socials: LinkList = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/governatorxyz',
    icon: <FiTwitter />
  }, {
    name: 'Discord',
    href: 'https://discord.com/invite/bankless',
    icon: <FaDiscord />
  }, {
    name: 'Notion',
    href: 'https://governator.notion.site/Governator-Project-Wiki-79eae545d0d04cddbf5c785ae187e53f',
    icon: <SiNotion />
  }
]



const Footer: React.FC = () => {

  const FooterLinks = () => {
    return (
      <>
        {links.map((link) => (
          <Link key={link.name} href={link.href}>
            <Box p='.5em 1em'>
              {link.name}
            </Box>
          </Link>)
        )}
      </>
    )
  }

  const SocialLinks = () => {
    return (
      <Flex>
        {socials.map((social) => (
          <Link key={social.name} href={social.href} target='_blank'>
            <Button
              variant='ghost'
              _hover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              {social.icon}
            </Button>
          </Link>)
        )}
      </Flex>
    )
  }

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
          md: 'row',
        }}
      >
        <Image
          src='./images/bankless.png'
          alt='BanklessDAO'
          alignSelf='center'
        />
        <Flex
          direction='column'
          align={{
            base: 'center',
            md: 'flex-end',
          }}
          bgGradient='grad.1'
        >
          <SocialLinks />
          <FooterLinks />
        </Flex>
      </Flex>
    </>
  )
}

export default Footer
