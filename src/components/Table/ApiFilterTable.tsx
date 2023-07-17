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
  Switch,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material'
// Table components
import { StyledTableCell } from './StyledTableCell'
import { StyledTableRow } from './StyledTableRow'
// Contained components
import SearchInput from './SearchInput'
import { ActionCell } from './ActionCell'
import { useSort } from './useSort'
import { usePagination } from './usePagination'
import { SortIcon } from './SortIcon'
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined'
import { PagenateDesign } from './PagenateDesign'
import { ColumnSelector } from './ColumnSelector'
import { idText } from 'typescript'

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
  const {
    page,
    itemsPerPage,
    handlePageChange,
    handleDirectPageChange, // You now have access to this function
  } = usePagination({
    page: 1,
    itemsPerPage: 10,
  })

  // page: 1, itemsPerPage: 10 という初期値を設定しています
  const pageCount = Math.ceil(filteredAndSortedRows.length / itemsPerPage)
  const paginatedRows = filteredAndSortedRows.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  )

  // New state for keeping track of deleted rows
  const [deletedRows, setDeletedRows] = useState<string[]>([])

  // Delete function
  const handleDelete = (rowId: string) => {
    setDeletedRows([...deletedRows, rowId])
    setFilteredAndSortedRows(
      filteredAndSortedRows.filter((row) => row.id.toString() !== rowId),
    )
  }

  // Search input change handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value),
      setFilteredAndSortedRows(
        sortedRows.filter((row) => multiFieldSearch(row, search)),
      )
    // 強制的にページを1に戻す
    handleDirectPageChange(1)
  }

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
      sortedRows
        .filter((row) => multiFieldSearch(row, search))
        .filter(({ id }) => !deletedRows.includes(id.toString())),
    )
  }, [sortedRows, search, deletedRows]) // deletedRowsを依存性配列に追加

  // Table columns
  const columns = [
    { label: 'id', key: 'id' },
    { label: 'Title', key: 'title' },
    { label: 'Price', key: 'price' },
    { label: 'Stock', key: 'stock' },
    // { label: 'Rating', key: 'rating' },
    { label: 'Brand', key: 'brand' },
    // { label: 'Category', key: 'category' },
    { label: 'Description', key: 'description' },
    { label: 'Thumbnail', key: 'thumbnail' },
  ]

  // Toggle columns
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([])

  const toggleColumnVisibility = (field: string) => {
    if (hiddenColumns.includes(field)) {
      setHiddenColumns(hiddenColumns.filter((column) => column !== field))
    } else {
      setHiddenColumns([...hiddenColumns, field])
    }
  }
  const hideAllColumns = () => {
    setHiddenColumns(columns.map((column) => column.key))
  }
  const showAllColumns = () => {
    setHiddenColumns([])
  }

  // Filter out deleted rows and columns
  const visibleRows = paginatedRows.filter(
    ({ id }) => !deletedRows.includes(id.toString()),
  )
  const visibleColumns = columns.filter(
    ({ key }) => !hiddenColumns.includes(key),
  )

  return (
    <>
      <SearchInput
        ref={searchInputRef}
        search={search}
        handleSearchChange={handleSearchChange}
        handleClearSearch={handleClearSearch}
        isSearchEmpty={isSearchEmpty}
      />
      <Box>
        <Box display="flex" justifyContent="flex-end" sx={{ pr: 1 }}>
          <ColumnSelector
            columns={columns}
            hiddenColumns={hiddenColumns}
            toggleColumnVisibility={toggleColumnVisibility}
            hideAllColumns={hideAllColumns}
            showAllColumns={showAllColumns}
          />
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700, minHeight: 300 }}
          aria-label="customized table"
        >
          {/* TableHead */}
          <TableHead>
            <TableRow>
              {columns
                .filter(({ key }) => !hiddenColumns.includes(key))
                .map(({ label, key }) => (
                  <StyledTableCell key={key} onClick={() => handleSort(key)}>
                    {label}
                    {sortField === key && (
                      <SortIcon direction={sortDirection} />
                    )}
                  </StyledTableCell>
                ))}
              <StyledTableCell align="center" width={140}>
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>

          {/* TableBody */}
          <TableBody>
            {visibleRows.length > 0 && visibleColumns.length > 0 ? (
              visibleRows
                .filter((row) => !deletedRows.includes(row.id.toString())) // Filter out deleted rows
                .map((row) => (
                  <StyledTableRow key={row.id}>
                    {columns
                      .filter(({ key }) => !hiddenColumns.includes(key))
                      .map(({ key }) => (
                        <StyledTableCell
                          key={key}
                          component="th"
                          scope="row"
                          sx={{ whiteSpace: 'keep-break', minWidth: '140px' }}
                        >
                          {key !== 'thumbnail' && row[key as keyof Product]}
                          {key === 'thumbnail' && (
                            <TableContainer
                              style={{
                                maxWidth: 120,
                                width: 'auto',
                                height: 'auto',
                              }}
                            >
                              <img
                                src={row.thumbnail}
                                alt="dummy"
                                width={120}
                              />
                            </TableContainer>
                          )}
                        </StyledTableCell>
                      ))}

                    <StyledTableCell
                      align="right"
                      width={140}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      <ActionCell row={row} handleDelete={handleDelete} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  component="th"
                  scope="row"
                  // 全部結合してセンタリング
                  colSpan={columns.length + 1}
                  sx={{ textAlign: 'center' }}
                >
                  <Typography variant="h5">No results found.</Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <PagenateDesign>
        <>
          <Typography component="span" variant="caption">
            Total records: {filteredAndSortedRows.length} / Current page: {page}{' '}
            / Total pages: {pageCount}
          </Typography>
        </>
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      </PagenateDesign>
    </>
  )
}
