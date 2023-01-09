import {
  Box,
  Flex,
  Input,
  Button,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'
import { IEmojiData } from 'emoji-picker-react'
import React, { useRef, useState } from 'react'
import {
  Control,
  Controller,
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormClearErrors,
  UseFormSetValue,
} from 'react-hook-form'
import { FiSmile, FiTrash } from 'react-icons/fi'
import { useOutsideClick } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import { Poll } from './PollForm';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false })

interface PollOptionProps {
  control: Control<Poll, any>
  i: number
  fields: FieldArrayWithId<Poll, 'poll_options', 'id'>[]
  clearErrors: UseFormClearErrors<Poll>
  errors: Record<string, any>
  remove: UseFieldArrayRemove
  setValue: UseFormSetValue<Poll>
  emojiExists: (emoji: string) => boolean
}

const PollOption: React.FC<PollOptionProps> = ({
  control,
  i,
  fields,
  clearErrors,
  errors,
  remove,
  setValue,
  emojiExists,
}) => {
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>(null)
  const [showPicker, setShowPicker] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const toast = useToast()

  useOutsideClick({
    ref: ref,
    handler: () => setShowPicker(false),
  })

  const onEmojiClick = (
    _: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData
  ) => {
    console.log(emojiExists(emojiObject.emoji))

    if (emojiExists(emojiObject.emoji)) {
      toast({
        status: 'error',
        description: 'Emoji already exists.',
        duration: 2000,
      })
      return
    }

    setChosenEmoji(emojiObject)
    setShowPicker(false)
    setValue(`poll_options.${i}.poll_option_emoji`, emojiObject.emoji)
    setValue(`poll_options.${i}._id`, emojiObject.emoji)
  }

  return (
    <Controller
      control={control}
      name={`poll_options.${i}.poll_option_name`}
      render={({ field: { onChange, onBlur, value } }) => (
        <Box>
          <Flex alignItems='center'>
            <Input
              onChange={e => {
                onChange(e)
                clearErrors('poll_options')
              }}
              borderColor='gray.400'
              onBlur={onBlur}
              value={value}
              mb='6px'
              {...(fields.length > 1 && { minW: '400px' })}
            />
            <Box mt='-3px' ml='10px' pos='relative' ref={ref}>
              <Button
                onClick={() => {
                  setShowPicker(true)
                }}
                size='sm'
                variant='outline'
              >
                {chosenEmoji ? chosenEmoji.emoji : <FiSmile />}
              </Button>

              {showPicker && (
                <Flex
                  flexDir={{
                    base: 'column-reverse',
                    lg: 'unset'
                  }}
                  alignItems={{
                    base: 'flex-end',
                    lg: 'unset'
                  }}
                  pos='absolute'
                  top={{
                    base: '-50px',
                    lg: '0px'
                  }}
                  left={{
                    base: null,
                  }}
                  right={{
                    base: '0px',
                    lg: 'unset'
                  }}
                  color='black'
                  zIndex={1000}
                >
                  <Picker onEmojiClick={onEmojiClick} />
                  <Button
                    mb={{
                      base: '16px'
                    }}
                    ml='8px'
                    onClick={() => {
                      setShowPicker(false)
                      setChosenEmoji(null)
                      setValue(`poll_options.${i}.poll_option_emoji`, '')
                      setValue(`poll_options.${i}._id`, '')
                    }}
                    size='sm'
                    variant='outline'
                  >
                    Clear
                  </Button>
                </Flex>
              )}
            </Box>

            {fields.length > 1 && (
              <Box position='relative' color='gray.300' mt='-3px'>
                <Button
                  onClick={() => {
                    remove(i)
                  }}
                  ml='10px'
                  size='sm'
                  variant='outline'
                >
                  <FiTrash />
                </Button>
              </Box>
            )}
          </Flex>
          <FormErrorMessage>
            {errors.poll_options?.[i]?.poll_option_name?.message}
          </FormErrorMessage>
        </Box>
      )}
    />
  )
}

export default PollOption
