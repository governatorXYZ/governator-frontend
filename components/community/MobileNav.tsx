import {
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerBody,
  Button,
  Drawer,
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
      />)) : <Box>No communities</Box>

  return (
    <Drawer
      isOpen={open}
      placement='right'
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create your account</DrawerHeader>

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