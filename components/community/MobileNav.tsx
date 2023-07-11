import {
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerBody,
  Heading,
  Button,
  Drawer,
  Image,
  Flex,
  Box,
} from '@chakra-ui/react'
import { useCommunities } from 'contexts/CommunitiesContext';
import { useRouter } from 'next/router';
import React from 'react'
import Community from './Community';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

function MobileNav({
  open,
  onClose
}: MobileNavProps) {
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
      />)) : (<Box
        fontSize={{
          base: '1.5rem',
        }}
      >
        No communities
      </Box>)

  return (
    <Drawer
      isOpen={open}
      placement='left'
      onClose={onClose}
      size='sm'
    >
      <DrawerOverlay
        h={'100%'}
        w={'100%'}
      />
      <DrawerContent
        maxH={'unset'}
        bg='var(--chakra-colors-gray-700)'
        color='white'
      >
        <DrawerCloseButton />
        <DrawerHeader
          fontSize={{
            base: '2.5rem',
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
        </DrawerHeader>
        <DrawerBody>
          { list }
        </DrawerBody>

        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='blue'>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileNav;