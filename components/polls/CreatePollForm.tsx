import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  DarkMode,
  Flex,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react'
import ThemedFormErrorMessage from 'components/ThemedFormErrorMessage'
import { uniqueId } from 'lodash'
import { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { FiPlus, FiTrash } from 'react-icons/fi'
import { Select } from 'chakra-react-select'
import ThemedDateTimePicker from 'components/ThemedDateTimePicker'

interface Poll {
  title: string
  channel: string
  options: { name: string }[]
  allowAnyoneToAddPoll: boolean
  singleVotePerUser: boolean
  hasEndTime: boolean
  endTime: Date
  description: string
  hasRoleRestrictions: boolean
  roleRestrictions: string[]
}

const options = [
  { value: 'chocolate', label: '#chocolate' },
  { value: 'strawberry', label: '#strawberry' },
  { value: 'vanilla', label: '#vanilla' },
]

const roles = [
  { value: 'level1', label: 'Level 1' },
  { value: 'level2', label: 'Level 2' },
  { value: 'level3', label: 'Level 3' },
]

const CreatePollForm: React.FC<BoxProps> = ({ ...props }) => {
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setValue,
    formState: { errors },
    watch,
  } = useForm<Poll>({
    defaultValues: {
      options: [{ name: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  })

  const submit = (data: Poll) => {
    console.log({ data })
  }

  return (
    <DarkMode>
      <Box {...props} color='gray.100'>
        <form onSubmit={handleSubmit(submit)}>
          <Text as='label' htmlFor='pollTitle' fontSize='lg' fontWeight='500'>
            Poll Title
          </Text>
          <Input
            borderColor='gray.400'
            type='text'
            placeholder='ex: Favorite animal?'
            {...register('title')}
          />
          <Text
            as='label'
            display='block'
            htmlFor='channel'
            mt='1rem'
            fontSize='lg'
            fontWeight='500'
          >
            Channel
          </Text>
          <Controller
            control={control}
            name='channel'
            render={({ field: { onBlur } }) => (
              <Select
                id='channel'
                options={options}
                isSearchable={false}
                onBlur={onBlur}
                onChange={i => {
                  setValue('channel', i?.label ?? '')
                }}
              />
            )}
          />
          <Text
            as='label'
            display='block'
            htmlFor='channel'
            mt='1rem'
            fontSize='lg'
            fontWeight='500'
          >
            Poll Options
          </Text>
          <Text as='span' fontSize='sm' display='block' mt='0.25rem' mb='1rem'>
            Enter poll options using simple text.
          </Text>
          {fields.map((f, i) => (
            <Box key={f.id}>
              <Controller
                control={control}
                name={`options.${i}.name`}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Box>
                    <Flex alignItems='center'>
                      <Input
                        onChange={e => {
                          onChange(e)
                          clearErrors('options')
                        }}
                        borderColor='gray.400'
                        onBlur={onBlur}
                        value={value}
                        mb='6px'
                        {...(fields.length > 1 && { w: '92%' })}
                      />
                      {fields.length > 1 && (
                        <Box position='relative' color='gray.300'>
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
                    <ThemedFormErrorMessage>
                      {errors.options?.[i]?.name?.message}
                    </ThemedFormErrorMessage>
                  </Box>
                )}
              />
            </Box>
          ))}
          <Button
            onClick={() => {
              append({ name: '' })
            }}
            variant='outline'
            size='sm'
            fontSize='13px'
            leftIcon={<FiPlus />}
            mr='8px'
          >
            Add another option
          </Button>
          <Flex alignItems='center' mt='1rem'>
            <Checkbox
              id='allowAnyoneToAddPoll'
              {...register('allowAnyoneToAddPoll')}
              size='lg'
            >
              <Text
                as='label'
                htmlFor='allowAnyoneToAddPoll'
                fontSize='lg'
                mt='0.25rem'
                ml='0.25rem'
                fontWeight='500'
              >
                Allow anyone to add poll option
              </Text>
            </Checkbox>
          </Flex>
          <Flex alignItems='center' mt='1rem'>
            <Checkbox
              id='singleVotePerUser'
              {...register('singleVotePerUser')}
              size='lg'
            >
              <Text
                as='label'
                htmlFor='singleVotePerUser'
                fontSize='lg'
                mt='0.25rem'
                ml='0.25rem'
                fontWeight='500'
              >
                Single vote per user
              </Text>
            </Checkbox>
          </Flex>
          <Flex alignItems='center' mt='1rem'>
            <Checkbox id='hasEndTime' {...register('hasEndTime')} size='lg'>
              <Text
                as='label'
                htmlFor='hasEndTime'
                fontSize='lg'
                mt='0.25rem'
                ml='0.25rem'
                fontWeight='500'
              >
                End time
              </Text>
            </Checkbox>
          </Flex>
          <Box mt='0.25rem'>
            <Text as='span' fontSize='sm' display='block' mb='1rem'>
              Please enter a time in your local timezone. It will be converted
              to the server timezone (UTC).
            </Text>
          </Box>
          <Controller
            control={control}
            name={'endTime'}
            render={({ field: { value } }) => (
              <ThemedDateTimePicker
                selected={value}
                onChange={(date: Date) => {
                  setValue('endTime', date)
                }}
                showTimeSelect
                dateFormat='MMMM d, yyyy h:mm aa'
              />
            )}
          ></Controller>
          <Text
            as='label'
            htmlFor='description'
            fontSize='lg'
            fontWeight='500'
            display='block'
            mt='1rem'
          >
            Description
          </Text>
          <Textarea
            borderColor='gray.400'
            type='text'
            rows={6}
            {...register('description')}
          />
          <Flex alignItems='center' mt='1rem' mb='0.5rem'>
            <Checkbox
              id='hasRoleRestrictions'
              {...register('hasRoleRestrictions')}
              size='lg'
            >
              <Text
                as='label'
                htmlFor='hasRoleRestrictions'
                fontSize='lg'
                mt='0.25rem'
                ml='0.25rem'
                fontWeight='500'
              >
                Role Restrictions
              </Text>
            </Checkbox>
          </Flex>
          <Controller
            control={control}
            name='roleRestrictions'
            render={({ field: { onBlur } }) => (
              <Select
                id='roleRestrictions'
                options={roles}
                isMulti
                isSearchable={false}
                onBlur={onBlur}
                onChange={i => {
                  setValue(
                    'roleRestrictions',
                    i.map(e => e.value)
                  )
                }}
              />
            )}
          />
          <Flex mt='4rem'>
            <Button type='submit' mx='auto'>
              Create poll in {watch('channel')}
            </Button>
          </Flex>
        </form>
      </Box>
    </DarkMode>
  )
}

export default CreatePollForm
