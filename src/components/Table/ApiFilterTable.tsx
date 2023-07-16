// src/components/Table/ApiFilterTable.tsx
import * as React from 'react'
import { useState, useEffect } from 'react'
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
import { SearchInput } from './SearchInput'
import { useSort } from './useSort'
import { ActionCell } from './ActionCell'
import { Pagination } from '@mui/material'
import { Box } from '@mui/system'
import { useFilter } from './useFilter'
import { SortIcon } from './SortIcon'

// API data type
export type Product = {
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

export const ApiFilterTable = () => {
  const [search, setSearch] = useState('')
  const isSearchEmpty = search === ''
  const [rows, setRows] = useState<Product[]>([]) // Defined rows as Product array

  const filteredRows = useFilter(rows, search, ['title']) // 新たにフィルタリングを行うフックを追加

  const { handleSort, sortField, sortDirection } = useSort(filteredRows)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setRows(data.products)
      } catch (error) {
        console.error('An error occurred while fetching the data.', error)
      }
    }
    fetchData()
  }, [])

  // Pagination states
  const [page, setPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
  }
  const pageCount = Math.ceil(filteredRows.length / itemsPerPage) // pageCountとpaginatedRowsはfilteredRowsを使用
  const paginatedRows = filteredRows.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  )

  return (
    <>
      <SearchInput
        search={search}
        handleSearchChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        handleClearSearch={() => setSearch('')}
        isSearchEmpty={isSearchEmpty}
      />

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell onClick={() => handleSort('title')}>
                Title
                {sortField === 'title' && (
                  <SortIcon direction={sortDirection} />
                )}
              </StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{row.title}</StyledTableCell>
                  <StyledTableCell>{row.price}</StyledTableCell>
                  <StyledTableCell>{row.stock}</StyledTableCell>
                  <StyledTableCell>{row.rating}</StyledTableCell>
                  <StyledTableCell>
                    <ActionCell row={row} />
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={5}>
                  <Typography variant="h5">No results found.</Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="flex-end">
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      </Box>
    </>
  )
}
