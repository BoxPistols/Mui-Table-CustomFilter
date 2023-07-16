// src/components/Table/ApiFilterTable.tsx
import * as React from 'react'
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
import { useState, useEffect } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

import { StyledTableCell } from './StyledTableCell'
import { StyledTableRow } from './StyledTableRow'
import { SearchInput } from './SearchInput'
import { ActionCell } from './ActionCell'
import { useSort } from './useSort' // useSort hook is imported

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleClearSearch = () => {
    setSearch('')
  }

  const SortIcon =
    sortDirection === 'asc' ? (
      <ArrowUpwardIcon
        sx={{
          fontSize: 20,
          position: 'absolute',
          top: '0.75em',
          padding: '0 2px',
        }}
      />
    ) : (
      <ArrowDownwardIcon
        sx={{
          fontSize: 20,
          position: 'absolute',
          top: '0.75em',
          padding: '0 2px',
        }}
      />
    )

  // Pagination states
  const [page, setPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
  }

  const pageCount = Math.ceil(filteredAndSortedRows.length / itemsPerPage)
  const paginatedRows = filteredAndSortedRows.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  )

  useEffect(() => {
    setFilteredAndSortedRows(
      sortedRows.filter((row) => multiFieldSearch(row, search)),
    )
  }, [sortedRows, search, page])

  return (
    <>
      <SearchInput
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
              <StyledTableCell onClick={() => handleSort('title')}>
                Title
                {sortField === 'title' && SortIcon}
              </StyledTableCell>
              <StyledTableCell onClick={() => handleSort('price')}>
                Price
                {sortField === 'price' && SortIcon}
              </StyledTableCell>
              <StyledTableCell onClick={() => handleSort('stock')}>
                Stock
                {sortField === 'stock' && SortIcon}
              </StyledTableCell>
              <StyledTableCell onClick={() => handleSort('rating')}>
                Rating
                {sortField === 'rating' && SortIcon}
              </StyledTableCell>
              <StyledTableCell align="center" width={140}>
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell>{row.price}</StyledTableCell>
                  <StyledTableCell>{row.stock}</StyledTableCell>
                  <StyledTableCell>{row.rating}</StyledTableCell>
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
          </TableBody>{' '}
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
