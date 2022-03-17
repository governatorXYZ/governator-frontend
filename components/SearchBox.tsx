import React, { useEffect, useMemo, useRef, useState } from 'react'
import Fuse from 'fuse.js'
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Box,
} from '@chakra-ui/react'
import { debounce } from 'lodash'
import { FiSearch, FiX } from 'react-icons/fi'

interface SearchBoxProps {
  setValue: (args: any) => void
  originalValues: any
  searchKeys: string[]
  isDisabled?: boolean
  placeholder?: string
}

const SearchBox: React.FC<SearchBoxProps> = ({
  setValue,
  originalValues,
  searchKeys,
  isDisabled,
  placeholder,
}) => {
  const [keyword, setKeyword] = useState('')
  const ref = useRef<HTMLInputElement>(null)

  const changeHandler = (event: any) => {
    setKeyword(event.target.value)
  }
  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [])

  useEffect(() => {
    if (!keyword) {
      setValue(originalValues)
    } else {
      const options = {
        keys: searchKeys,
        includeScore: true,
        includeMatches: true,
        ignoreLocation: true,
        isCaseSensitive: true,
        threshold: 0,
      }
      const fuse = new Fuse(originalValues, options)
      const results = fuse.search(keyword)

      const newValues = results
        .sort((prev, next) =>
          Number(prev.score) < Number(next.score) ? -1 : 1
        )
        .map(i => i.item)

      setValue(newValues)
    }
  }, [keyword])
  return (
    <Box maxW='max-content'>
      <InputGroup>
        <InputLeftElement pointerEvents='none' color='gray.400'>
          <FiSearch />
        </InputLeftElement>
        <Input
          type='text'
          size='md'
          w='xs'
          borderColor='gray.400'
          color='gray.200'
          ref={ref}
          onChange={debouncedChangeHandler}
          isDisabled={isDisabled}
          placeholder={placeholder}
        />
        {keyword && (
          <InputRightElement
            color='gray.400'
            cursor='pointer'
            onClick={() => {
              ref.current!.value = ''
              setKeyword('')
              setValue(originalValues)
            }}
          >
            <FiX />
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  )
}

export default SearchBox
