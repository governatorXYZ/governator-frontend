import { DeleteIcon } from '@chakra-ui/icons'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  useToast,
} from '@chakra-ui/react'
import { privateBaseAxios } from 'constants/axios'
import { Poll } from 'interfaces'
import React, { useState } from 'react'

const DeletePoll: React.FC<{ poll: Poll; mutate: () => void }> = ({
  poll,
  mutate,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const onDelete = async () => {
    try {
      setLoading(true)
      const res = await privateBaseAxios.delete(`/poll/delete/${poll._id}`)

      if (res.data) {
        toast({
          status: 'success',
          description: 'The poll has been deleted successfully.',
        })
        mutate()
        setLoading(false)
        onClose()
      }
    } catch (err) {
      setLoading(false)
      toast({ status: 'error', description: 'An error has occured.' })
    }
  }

  return (
    <>
      <Button
        variant='ghost'
        size='sm'
        color='red.500'
        _active={{
          color: 'white',
          backgroundColor: 'red.300',
        }}
        _hover={{
          color: 'white',
          backgroundColor: 'red.500',
        }}
        onClick={onOpen}
      >
        <DeleteIcon fontSize='15px' />
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          if (!loading) {
            onClose()
          }
        }}
      >
        <ModalOverlay />
        <ModalContent minW='600px'>
          <ModalHeader>Delete Poll</ModalHeader>
          <ModalCloseButton isDisabled={loading} />
          <ModalBody>
            <Text>
              This action will delete the poll{' '}
              <strong>&quot;{poll.title}&quot;</strong> and any associated votes
              with it.
            </Text>
            <Text mt='1rem'>Do you really want to delete this poll?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='red'
              mr={3}
              onClick={onDelete}
              isLoading={loading}
              isDisabled={loading}
            >
              Yes, delete poll.
            </Button>
            <Button mr={3} onClick={onClose} isDisabled={loading}>
              Oh, nevermind.
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeletePoll
