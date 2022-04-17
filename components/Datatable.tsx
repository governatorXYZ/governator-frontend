import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import {
  Table,
  Thead,
  Tr,
  Th,
  chakra,
  Tbody,
  Td,
  Box,
  Flex,
  Spinner,
  Text,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { Column, useSortBy, useTable } from 'react-table'

interface DataTableProps {
  data: Array<any>
  columns: Array<Column<any>>
  loading: boolean
}

const StyledTable = styled(Table)`
  & {
    thead tr {
      background-color: #1a1d24;
      th {
        border-color: transparent;
      }
    }
    tbody tr:nth-child(odd) {
      background-color: #21262e;
    }
    tbody tr td {
      border-color: transparent;
    }
  }
`

const DataTable: React.FC<DataTableProps> = ({ data, columns, loading }) => {
  const memoizedData = React.useMemo(() => data, [data])
  const memoizedColumns = React.useMemo(() => columns, [])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: memoizedColumns, data: memoizedData }, useSortBy)

  return (
    <>
      <StyledTable {...getTableProps()} color='gray.200'>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any, index: number) => {
                const lastColumn = index === headerGroup.headers.length - 1

                return (
                  <Th
                    {...(!lastColumn &&
                      column.getHeaderProps(column.getSortByToggleProps()))}
                    isNumeric={column.isNumeric}
                    color='gray.200'
                  >
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      {...(lastColumn && {
                        justifyContent: 'center',
                      })}
                    >
                      <chakra.span mr='1rem'>
                        {column.render('Header')}
                      </chakra.span>
                      {!lastColumn && (
                        <chakra.span display='flex' flexDir='column'>
                          <TriangleUpIcon
                            aria-label='sorted ascending'
                            fontSize='8px'
                            color='gray.600'
                            {...(column.isSorted &&
                              !column.isSortedDesc && { color: 'gray.200' })}
                          />
                          <TriangleDownIcon
                            aria-label='sorted descending'
                            fontSize='8px'
                            color='gray.600'
                            {...(column.isSorted &&
                              column.isSortedDesc && { color: 'gray.200' })}
                          />
                        </chakra.span>
                      )}
                    </Box>
                  </Th>
                )
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {!loading &&
            rows.map(row => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={(cell.column as any).isNumeric}
                    >
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              )
            })}
        </Tbody>
      </StyledTable>
      {loading && (
        <Flex mt='1rem'>
          <Spinner color='gray.200' mx='auto' />
        </Flex>
      )}
      {!loading && !rows?.length && (
        <Text
          as='span'
          display='block'
          w='max-content'
          mx='auto'
          color='gray.200'
          mt='1rem'
        >
          There are no records.
        </Text>
      )}
    </>
  )
}
export default DataTable
