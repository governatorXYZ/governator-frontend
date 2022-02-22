import styled from '@emotion/styled'
import { Box } from '@chakra-ui/react'

import 'react-datepicker/dist/react-datepicker.css'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { FiCalendar } from 'react-icons/fi'
import { useRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

const StyledDatePicker = styled(DatePicker)`
  background: transparent;
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #a0aec0;
  border-radius: 6px;
`

const ThemedDateTimePicker: React.FC<ReactDatePickerProps> = ({
  selected,
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
      <Box
        pos='absolute'
        bottom='30%'
        right='20px'
        onClick={() => {
          ref.current?.setFocus()
        }}
        cursor='pointer'
      >
        <FiCalendar fontSize='20px' />
      </Box>
    </Box>
  )
}
export default ThemedDateTimePicker
