// src/components/Table/ApiFilterTable.tsx
import * as React from 'react'
import { useState, useEffect, useRef } from 'react'

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
  Typography,
} from '@mui/material'
// Table components
import { StyledTableCell } from './StyledTableCell'
import { StyledTableRow } from './StyledTableRow'
// Contained components
import SearchInput from './SearchInput'
import { ActionCell } from './ActionCell'
import { useSort } from './useSort' // useSort hook is imported
import { usePagination } from './usePagination'
// Icons
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { SortIcon } from './SortIcon'

// API data type
type Product = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

// Search in all fields of the object
const multiFieldSearch = (row: Product, query: string) => {
  // Define the fields to include in the search
  const searchableFields: (keyof Product)[] = [
    'title',
    'description',
    'price',
    'rating',
    'stock',
    'brand',
    'category',
  ]

  return searchableFields.some((field) =>
    String(row[field]).toLowerCase().includes(query.toLowerCase()),
  )
}

export const ApiFilterTable = () => {
  const [search, setSearch] = useState('')
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const isSearchEmpty = search === ''
  const [filteredAndSortedRows, setFilteredAndSortedRows] = useState<Product[]>(
    [],
  )

  const [rows, setRows] = useState<Product[]>([]) // Defined rows as Product array
  const { sortedRows, handleSort, sortField, sortDirection } = useSort<
    Product,
    keyof Product
  >(rows)

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => setRows(data.products))
  }, [])

  // Pagination states
  const { page, itemsPerPage, handlePageChange } = usePagination({
    page: 1,
    itemsPerPage: 10,
  })
  // page: 1, itemsPerPage: 10 という初期値を設定しています
  const pageCount = Math.ceil(filteredAndSortedRows.length / itemsPerPage)
  const paginatedRows = filteredAndSortedRows.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  )

  // Search input handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value),
      setFilteredAndSortedRows(
        sortedRows.filter((row) => multiFieldSearch(row, search)),
      )
  } // Added setFilteredAndSortedRows

  // Clear search input
  function handleClearSearch(): void {
    setSearch('')
  }

  // Keyboard shortcuts
  useEffect(() => {
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

  // Filter and sort rows
  useEffect(() => {
    setFilteredAndSortedRows(
      sortedRows.filter((row) => multiFieldSearch(row, search)),
    )
  }, [sortedRows, search, page])

  // Table columns
  const columns = [
    { label: 'Title', key: 'title' },
    { label: 'Price', key: 'price' },
    { label: 'Stock', key: 'stock' },
    { label: 'Rating', key: 'rating' },
  ]

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
                  {sortField === key && <SortIcon direction={sortDirection} />}
                </StyledTableCell>
              ))}
              <StyledTableCell align="center" width={140}>
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <StyledTableRow key={row.id}>
                  {columns.map(({ key }) => (
                    <StyledTableCell
                      key={key}
                      component="th"
                      scope="row"
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      {row[key as keyof Product]}
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
              <StyledTableRow>
                <StyledTableCell
                  component="th"
                  scope="row"
                  colSpan={5}
                  sx={{ textAlign: 'center' }}
                >
                  <Typography variant="h5">No results found.</Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 1,
        }}
      >
        <Typography>
          <Typography component="span" variant="caption">
            Total records: {filteredAndSortedRows.length} / Current page: {page}{' '}
            / Total pages: {pageCount}
          </Typography>
        </Typography>
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      </Box>
    </>
  )
}
