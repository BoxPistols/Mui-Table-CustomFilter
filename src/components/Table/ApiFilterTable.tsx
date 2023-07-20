// // file name is ApiFilterTable.tsx
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
import { useSort } from './useSort'
import { usePagination } from './usePagination'
import { SortIcon } from './SortIcon'
import { PagenateDesign } from './PagenateDesign'
import { ColumnSelector } from './ColumnSelector'
import { useColumnSelector } from './useColumnSelector'
// FilterForm.tsx
import { FilterForm } from './FilterForm'

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
  // New state for keeping track of deleted rows
  const [deletedRows, setDeletedRows] = useState<string[]>([])

  // ----- TODO: ----
  const [filters, setFilters] = useState<Record<string, string>>({})

  // Fetch data from API and set rows
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        setRows(data.products)
      })
  }, [])

  // Compute unique values after rows are fetched and set
  useEffect(() => {
    // Compute unique values
    const uniqueValues: Record<string, string[]> = {}
    rows.forEach((product: Product) => {
      for (const key in product) {
        // Change 'let' to 'const' for 'key'
        if (!uniqueValues[key as keyof Product]) {
          uniqueValues[key as keyof Product] = []
        }
        if (
          !uniqueValues[key as keyof Product].includes(
            String(product[key as keyof Product]),
          )
        ) {
          uniqueValues[key as keyof Product].push(
            String(product[key as keyof Product]),
          )
        }
      }
    })
    setUniqueValues(uniqueValues)
  }, [rows])

  // フィルタリングの変更を処理する関数を定義します。
  const handleFilterChange = (
    newFilters: React.SetStateAction<Record<string, string>>,
  ) => {
    setFilters(newFilters)
    // FIXME: Debug
    console.log(newFilters)
  }

  useEffect(() => {
    // FIXME: Debug
    console.log(filters);
  }, [filters]);

  // フィルタリングの変更を処理する関数を定義します。
  const filterRows = (
    row: Product,
    filters: { [s: string]: unknown } | ArrayLike<unknown>,
  ) => {
    // Apply all filters one by one. If a row doesn't pass any filter, it's not included.
    for (const [key, value] of Object.entries(filters)) {
      if (
        value !== '' &&
        String(row[key as keyof Product]).toLowerCase() !==
        (value as string).toLowerCase()
      ) {
        return false
      }
    }
    return true
  }

  // ... some other codes ...
  useEffect(() => {
    setFilteredAndSortedRows(
      sortedRows
        .filter((row) => multiFieldSearch(row, search))
        .filter((row) => filterRows(row, filters))
        .filter(({ id }) => !deletedRows.includes(id.toString())),
    )
  }, [sortedRows, search, deletedRows, filters])

  // add the new state to handle unique values
  const [uniqueValues, setUniqueValues] = useState<Record<string, string[]>>({})

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

  // // Filter and sort rows
  // useEffect(() => {
  //   setFilteredAndSortedRows(
  //     sortedRows
  //       .filter((row) => multiFieldSearch(row, search))
  //       .filter(({ id }) => !deletedRows.includes(id.toString())),
  //   )
  // }, [sortedRows, search, deletedRows]) // deletedRowsを依存性配列に追加

  // Table columns
  const columns = [
    { label: 'id', key: 'id' },
    { label: 'Title', key: 'title' },
    { label: 'Price', key: 'price' },
    { label: 'Stock', key: 'stock' },
    { label: 'Rating', key: 'rating' },
    { label: 'Brand', key: 'brand' },
    { label: 'Category', key: 'category' },
    { label: 'Description', key: 'description' },
    { label: 'Thumbnail', key: 'thumbnail' },
  ]

  // Toggle columns
  const {
    hiddenColumns,
    toggleColumnVisibility,
    hideAllColumns,
    showAllColumns,
  } = useColumnSelector(columns)

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

      {/* In the render method of ApiFilterTable */}
      <FilterForm
        columns={columns as { label: string; key: string }[]}
        onFilterChange={handleFilterChange}
        uniqueValues={uniqueValues}
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
                                maxWidth: 80,
                                maxHeight: 60,
                                width: 'auto',
                                height: 'auto',
                                overflow: 'hidden',
                              }}
                            >
                              <img
                                src={row.thumbnail}
                                alt="dummy"
                                width={80}
                              // height={40}
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
