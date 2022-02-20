import styled from '@emotion/styled'
import { Box, Button } from '@chakra-ui/react'

import 'react-datepicker/dist/react-datepicker.css'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { FiCalendar, FiX } from 'react-icons/fi'
import { useRef } from 'react'

const StyledDatePicker = styled(DatePicker)`
  background: transparent;
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #a0aec0;
  border-radius: 6px;
`

interface ThemedDateTimePickerProps extends ReactDatePickerProps {
  onReset: () => void
}

const ThemedDateTimePicker: React.FC<ThemedDateTimePickerProps> = ({
  selected,
  onReset,
  onChange,
}) => {
  const ref = useRef<DatePicker>(null)

  return (
    <Box color='gray.200' mt='1rem' pos='relative'>
      <StyledDatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect
        dateFormat='MMMM d, yyyy h:mm aa'
        ref={ref}
      />
      {selected && (
        <Button
          pos='absolute'
          bottom='5px'
          right='50px'
          size='sm'
          px='0.5rem'
          backgroundColor='transparent'
          onClick={onReset}
          cursor='pointer'
        >
          <FiX fontSize='20px' />
        </Button>
      )}
      <Button
        pos='absolute'
        bottom='5px'
        right='10px'
        size='sm'
        px='0.5rem'
        backgroundColor='transparent'
        onClick={() => {
          ref.current?.setFocus()
        }}
        cursor='pointer'
      >
        <FiCalendar fontSize='20px' />
      </Button>
    </Box>
  )
}
export default ThemedDateTimePicker
