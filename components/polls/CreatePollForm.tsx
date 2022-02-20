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
} from '@chakra-ui/react'
import ThemedFormErrorMessage from 'components/ThemedFormErrorMessage'
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
  endTime: Date | null
  description: string
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
            <FormLabel mt='1rem' htmlFor='channel'>
              Channel
            </FormLabel>
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
              fontWeight='400'
              mr='8px'
            >
              Add another option
            </Button>
          </FormControl>
          <FormControl>
            <Flex alignItems='center' mt='1rem'>
              <Checkbox
                id='allowAnyoneToAddPoll'
                {...register('allowAnyoneToAddPoll')}
              >
                <Text
                  as='label'
                  htmlFor='allowAnyoneToAddPoll'
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
              <Checkbox
                id='singleVotePerUser'
                {...register('singleVotePerUser')}
              >
                <Text
                  as='label'
                  htmlFor='singleVotePerUser'
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
              name={'endTime'}
              render={({ field: { value } }) => (
                <ThemedDateTimePicker
                  selected={value}
                  onChange={(date: Date) => {
                    setValue('endTime', date)
                  }}
                  onReset={() => {
                    setValue('endTime', null)
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
          </FormControl>
          <Flex mt='4rem'>
            <Button type='submit' mx='auto'>
              Create poll{' '}
              {`${watch('channel') ? `in ${watch('channel')}` : ''}`}
            </Button>
          </Flex>
        </form>
      </Box>
    </DarkMode>
  )
}

export default CreatePollForm
