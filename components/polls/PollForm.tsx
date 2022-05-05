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
import { FiPlus } from 'react-icons/fi'
import { Select } from 'chakra-react-select'
import ThemedDateTimePicker from 'components/ThemedDateTimePicker'
import { privateBaseAxios } from 'constants/axios'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import useServer from 'hooks/useServer'
import PollOption from './PollOption'

interface Poll {
  title: string
  channel_id: string
  poll_options: {
    _id: string
    poll_option_name: string
    poll_option_emoji: string
  }[]
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
      _id: yup.string(),
      poll_option_name: yup.string(),
      poll_option_emoji: yup.string(),
    })
  ),
  allow_options_for_anyone: yup.boolean(),
  single_vote: yup.boolean(),
  end_time: yup.date().required('Required.'),
  description: yup.string().required('Required.'),
  author_user_id: yup.string().required('Required'),
})

const PollForm: React.FC<BoxProps> = ({ ...props }) => {
  const router = useRouter()
  const { roles, channels } = useServer()

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

  const emojiExists = (emoji: string) =>
    watch('poll_options').some(p => p.poll_option_emoji === emoji)

  const toast = useToast()

  const createEmoji = (emojiIterator: number) => {
    const listings = [
      '1️⃣',
      '2️⃣',
      '3️⃣',
      '4️⃣',
      '5️⃣',
      '6️⃣',
      '7️⃣',
      '8️⃣',
      '9️⃣',
      '🔟',
    ]
    return listings[emojiIterator]
  }

  const submit = async (data: Poll) => {
    try {
      const pollOptions = data.poll_options.map((p, i) => {
        if (p._id) return p
        const newEmoji = createEmoji(i)
        return {
          _id: newEmoji,
          poll_option_name: p.poll_option_name,
          poll_option_emoji: newEmoji,
        }
      })

      const submittedData = { ...data, poll_options: pollOptions }

      const res = await privateBaseAxios.post('/poll/create', submittedData)

      if (res.data) {
        await router.push(router.asPath.replace('/create', ''))
        toast({
          status: 'success',
          description: 'The poll has been created successfully.',
        })
      }
    } catch (err) {
      toast({ status: 'error', description: 'An error has occured.' })
    }
  }

  useEffect(() => {
    append({ poll_option_name: '' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
                  options={channels}
                  isSearchable
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
                <PollOption
                  remove={remove}
                  control={control}
                  i={i}
                  fields={fields}
                  clearErrors={clearErrors}
                  errors={errors}
                  setValue={setValue}
                  emojiExists={emojiExists}
                />
              </Box>
            ))}
            {fields.length < 8 && (
              <Button
                onClick={() => {
                  append({ poll_option_name: '' })
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
            )}
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
                  isSearchable
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
                      channels.find(o => o.value === watch('channel_id'))?.label
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
