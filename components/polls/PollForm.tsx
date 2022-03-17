import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  DarkMode,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { FiPlus, FiTrash } from 'react-icons/fi'
import { Select } from 'chakra-react-select'
import ThemedDateTimePicker from 'components/ThemedDateTimePicker'
import { privateBaseAxios } from 'constants/axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { capitalize } from 'lodash'

interface Poll {
  title: string
  channel_id: string
  poll_options: { name: string }[]
  allow_options_for_anyone: boolean
  single_vote: boolean
  end_time: Date | null
  description: string
  role_restrictions: string[]
  author_user_id: string
}

const schema = yup.object().shape({
  title: yup.string().required('Required.'),
  channel_id: yup.string().required('Required.'),
  poll_options: yup.array().of(
    yup.object().shape({
      name: yup.string(),
    })
  ),
  allow_options_for_anyone: yup.boolean(),
  single_vote: yup.boolean(),
  end_time: yup.date().required('Required.'),
  description: yup.string().required('Required.'),
  author_user_id: yup.string().required('Required'),
})

const options = [
  { value: '1234', label: '#chocolate' },
  { value: '2345', label: '#strawberry' },
  { value: '3456', label: '#vanilla' },
]

const roles = [
  { value: 'level-1', label: 'Level 1' },
  { value: 'level-2', label: 'Level 2' },
  { value: 'level-3', label: 'Level 3' },
]

const PollForm: React.FC<BoxProps> = ({ ...props }) => {
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<Poll>({
    resolver: yupResolver(schema),
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'poll_options',
  })

  const toast = useToast()

  const submit = async (data: Poll) => {
    try {
      const res = await privateBaseAxios.post('/poll/create', data)

      if (res.data) {
        toast({
          status: 'success',
          description: 'The poll has been created successfully.',
        })
      }
    } catch (err) {
      toast({ status: 'error', description: 'An error has occured.' })
    }
  }

  return (
    <DarkMode>
      <Box {...props} color='gray.100'>
        <form onSubmit={handleSubmit(submit)}>
          <FormControl isInvalid={!!errors.title?.message}>
            <FormLabel htmlFor='title'>Poll Title</FormLabel>
            <Input
              borderColor='gray.400'
              type='text'
              placeholder='ex: Favorite animal?'
              id='title'
              {...register('title')}
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.channel_id?.message}>
            <FormLabel mt='1rem' htmlFor='channel_id'>
              Channel
            </FormLabel>
            <Controller
              control={control}
              name='channel_id'
              render={({ field: { onBlur } }) => (
                <Select
                  id='channel_id'
                  options={options}
                  isSearchable={false}
                  onBlur={onBlur}
                  onChange={i => {
                    setValue('channel_id', i?.value ?? '')
                    clearErrors('channel_id')
                  }}
                />
              )}
            />
            <FormErrorMessage>{errors.channel_id?.message}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel mt='1rem' htmlFor='options'>
              Poll Options
            </FormLabel>
            <Text
              as='span'
              fontSize='sm'
              display='block'
              mb='0.5rem'
              fontWeight='300'
            >
              Enter poll options using simple text.
            </Text>
            {fields.map((f, i) => (
              <Box key={f.id}>
                <Controller
                  control={control}
                  name={`poll_options.${i}.name`}
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
                      <FormErrorMessage>
                        {errors.poll_options?.[i]?.name?.message}
                      </FormErrorMessage>
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
              fontWeight='400'
              mr='8px'
            >
              Add another option
            </Button>
          </FormControl>
          <FormControl>
            <Flex alignItems='center' mt='1rem'>
              <Checkbox
                id='allow_options_for_anyone'
                {...register('allow_options_for_anyone')}
              >
                <Text
                  as='label'
                  htmlFor='allow_options_for_anyone'
                  mt='0.25rem'
                  ml='0.25rem'
                  fontWeight='500'
                >
                  Allow anyone to add poll option
                </Text>
              </Checkbox>
            </Flex>
          </FormControl>
          <FormControl>
            <Flex alignItems='center' mt='1rem'>
              <Checkbox id='single_vote' {...register('single_vote')}>
                <Text
                  as='label'
                  htmlFor='single_vote'
                  mt='0.25rem'
                  ml='0.25rem'
                  fontWeight='500'
                >
                  Single vote per user
                </Text>
              </Checkbox>
            </Flex>
          </FormControl>
          <FormControl isInvalid={!!errors.end_time?.message}>
            <FormLabel mt='1rem' htmlFor='endTime'>
              End time
            </FormLabel>
            <Box mt='0.25rem'>
              <Text
                as='span'
                fontSize='sm'
                display='block'
                mb='1rem'
                fontWeight='300'
              >
                Please enter a time in your local timezone. It will be converted
                to the server timezone (UTC).
              </Text>
            </Box>
            <Controller
              control={control}
              name={'end_time'}
              render={({ field: { value } }) => (
                <ThemedDateTimePicker
                  selected={value}
                  onChange={(date: Date) => {
                    setValue('end_time', date)
                    clearErrors('end_time')
                  }}
                  onReset={() => {
                    setValue('end_time', null)
                    clearErrors('end_time')
                  }}
                  id='endTime'
                  showTimeSelect
                  dateFormat='MMMM d, yyyy h:mm aa'
                  isInvalid={!!errors.end_time?.message}
                />
              )}
            />
            <FormErrorMessage>{errors.end_time?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.description?.message}>
            <FormLabel mt='1rem' htmlFor='description'>
              Description
            </FormLabel>
            <Textarea
              borderColor='gray.400'
              type='text'
              rows={6}
              {...register('description')}
            />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel mt='1rem' htmlFor='roleRestrictions'>
              Role restrictions
            </FormLabel>
            <Controller
              control={control}
              name='role_restrictions'
              render={({ field: { onBlur } }) => (
                <Select
                  id='roleRestrictions'
                  options={roles}
                  isMulti
                  isSearchable={false}
                  onBlur={onBlur}
                  onChange={i => {
                    setValue(
                      'role_restrictions',
                      i.map(e => e.value)
                    )
                  }}
                />
              )}
            />
          </FormControl>
          <input
            type='hidden'
            {...register('author_user_id')}
            value='623190782abb88dc97fdfb2a'
          />
          <Flex mt='4rem'>
            <Button
              type='submit'
              mx='auto'
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              Create poll{' '}
              {`${
                watch('channel_id')
                  ? `in ${
                      options.find(o => o.value === watch('channel_id'))?.label
                    }`
                  : ''
              }`}
            </Button>
          </Flex>
        </form>
      </Box>
    </DarkMode>
  )
}

export default PollForm
