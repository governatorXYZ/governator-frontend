import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  DarkMode,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import ThemedFormErrorMessage from 'components/ThemedFormErrorMessage'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { FiPlus, FiTrash } from 'react-icons/fi'
import { Select } from 'chakra-react-select'
import ThemedDateTimePicker from 'components/ThemedDateTimePicker'
import { privateBaseAxios } from 'constants/axios'

interface Poll {
  title: string
  channel_id: string
  poll_options: { name: string }[]
  allow_options_for_anyone: boolean
  single_vote: boolean
  end_time: Date | null
  description: string
  role_restrictions: string[]
  author_discord_id: string
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
    formState: { errors, isSubmitting },
    watch,
  } = useForm<Poll>({
    defaultValues: {
      poll_options: [{ name: '' }],
      author_discord_id: '',
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'poll_options',
  })

  const toast = useToast()

  const submit = async (data: Poll) => {
    try {
      const res = await privateBaseAxios.post('/polls/create', data)

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
          <FormControl>
            <FormLabel htmlFor='pollTitle'>Poll Title</FormLabel>
            <Input
              borderColor='gray.400'
              type='text'
              placeholder='ex: Favorite animal?'
              id='pollTitle'
              {...register('title')}
            />
          </FormControl>
          <FormControl>
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
                    setValue('channel_id', i?.label ?? '')
                  }}
                />
              )}
            />
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
                      <ThemedFormErrorMessage>
                        {errors.poll_options?.[i]?.name?.message}
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
          <FormControl>
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
                  }}
                  onReset={() => {
                    setValue('end_time', null)
                  }}
                  id='endTime'
                  showTimeSelect
                  dateFormat='MMMM d, yyyy h:mm aa'
                />
              )}
            ></Controller>
          </FormControl>
          <FormControl>
            <FormLabel mt='1rem' htmlFor='description'>
              Description
            </FormLabel>
            <Textarea
              borderColor='gray.400'
              type='text'
              rows={6}
              {...register('description')}
            />
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
          <Flex mt='4rem'>
            <Button
              type='submit'
              mx='auto'
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              Create poll{' '}
              {`${watch('channel_id') ? `in ${watch('channel_id')}` : ''}`}
            </Button>
          </Flex>
        </form>
      </Box>
    </DarkMode>
  )
}

export default CreatePollForm
