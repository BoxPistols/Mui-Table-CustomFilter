// src/components/Table/SearchFilterTable.tsx
import * as React from 'react'
import { useState, useRef } from 'react'
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material'
import { StyledTableCell } from './StyledTableCell'
import { StyledTableRow } from './StyledTableRow'
import SearchInput from './SearchInput'

import { useSort } from './useSort'
import { ActionCell } from './ActionCell'

type RowData = {
  name: string
  calories: number
  fat: number
  carbs: number
  protein: number
}

const initialRows = [
  { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
  },
  { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
  { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
  // Add More Data dummy random key value Here
]

type Column = {
  label: string
  key: keyof RowData
}

const columns: Column[] = [
  { label: 'Dessert (100g serving)', key: 'name' },
  { label: 'Calories', key: 'calories' },
  { label: 'Fat (g)', key: 'fat' },
  { label: 'Carbs (g)', key: 'carbs' },
  { label: 'Protein (g)', key: 'protein' },
]

// Dummy random key generator
function generateRandomKey(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let key = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    key += characters.charAt(randomIndex)
  }
  return key
}

// Dummy random data generator
function createRandomData() {
  const randomKey = generateRandomKey(10)
  const randomValue1 = Math.floor(Math.random() * 1000)
  const randomValue2 = Math.floor(Math.random() * 100)
  const randomValue3 = Math.floor(Math.random() * 100)
  const randomValue4 = Math.floor(Math.random() * 15)

  return {
    name: randomKey,
    calories: randomValue1,
    fat: randomValue2,
    carbs: randomValue3,
    protein: randomValue4,
  }
}

const numberOfEntries = 3 // Number of data entries to add

for (let i = 0; i < numberOfEntries; i++) {
  const newData = createRandomData()
  initialRows.push(newData)
}

export const SearchFilterTable = () => {
  const [search, setSearch] = useState<string>('')
  const isSearchEmpty = search === ''

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleClearSearch = () => {
    setSearch('')
  }

  const filteredRows = initialRows.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase()),
  )

  const { sortedRows, handleSort } = useSort<RowData, keyof RowData>(
    filteredRows,
  )

  // Search input ref
  const searchInputRef = useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      // ESCキーで検索をクリア
      if (event.key === 'Escape') {
        handleClearSearch()
      }

      // Cmd + / or Ctrl + / で検索フィールドにフォーカス
      if ((event.metaKey || event.ctrlKey) && event.key === '/') {
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', keydownHandler)

    // Clean up the event listener when the component is unmounted
    return () => window.removeEventListener('keydown', keydownHandler)
  }, [])
  return (
    <>
      <SearchInput
        ref={searchInputRef}
        search={search}
        handleSearchChange={handleSearchChange}
        handleClearSearch={handleClearSearch}
        isSearchEmpty={isSearchEmpty}
      />

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700, minHeight: 300 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              {columns.map(({ label, key }) => (
                <StyledTableCell key={key} onClick={() => handleSort(key)}>
                  {label}
                </StyledTableCell>
              ))}
              <StyledTableCell align="center" width={140}>
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.length > 0 ? (
              sortedRows.map((row) => (
                <StyledTableRow key={row.name}>
                  {columns.map(({ key }) => (
                    <StyledTableCell key={key} component="th" scope="row">
                      {row[key]}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell
                    align="right"
                    width={140}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    <ActionCell row={row} />
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableCell
                component="th"
                scope="row"
                colSpan={5}
                sx={{ textAlign: 'center' }}
              >
                <Typography variant="h5">No results found.</Typography>
              </StyledTableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
