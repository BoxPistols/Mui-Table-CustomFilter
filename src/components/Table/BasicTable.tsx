// Reactなどの必要なライブラリやコンポーネントをインポートします
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
// 表のスタイリングに使用するカスタムコンポーネントをインポートします
import { StyledTableCell } from './StyledTableCell'
import { StyledTableRow } from './StyledTableRow'
// 使用するコンポーネントをインポートします
import SearchInput from './SearchInput'
import { ActionCell } from './ActionCell'
// ソートとページネーションのカスタムフックをインポートします
import { useSort } from './useSort'
import { usePagination } from './usePagination'
// ソートアイコン、ページネートデザイン、列セレクタのコンポーネントをインポートします
import { SortIcon } from './SortIcon'
import { PagenateDesign } from './PagenateDesign'
import { ColumnSelector } from './ColumnSelector'
// 列の表示状態を管理するカスタムフックをインポートします
import { useColumnSelector } from './useColumnSelector'

// プロダクトの型を定義します。これはAPIから取得するデータの型です
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

// 複数のフィールドを対象にした検索関数です
const multiFieldSearch = (row: Product, query: string) => {
  // 検索に含めるフィールドを定義します
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

// ApiFilterTableコンポーネントを定義します
export const BasicTable = () => {
  // 各種stateを定義します
  const [search, setSearch] = useState('')
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const isSearchEmpty = search === ''
  const [filteredAndSortedRows, setFilteredAndSortedRows] = useState<Product[]>(
    [],
  )
  const [rows, setRows] = useState<Product[]>([]) // rowsをProduct型の配列として定義します
  const { sortedRows, handleSort, sortField, sortDirection } = useSort<
    Product,
    keyof Product
  >(rows)
  // 削除された行を追跡する新しいstateを定義します
  const [deletedRows, setDeletedRows] = useState<string[]>([])

  // APIからデータを取得してrowsを設定します
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        setRows(data.products)
      })
  }, [])

  // 行のフィルタリングとソートを適用します
  useEffect(() => {
    setFilteredAndSortedRows(
      sortedRows
        .filter((row) => isSearchEmpty || multiFieldSearch(row, search))
        .filter(({ id }) => !deletedRows.includes(id.toString())),
    )
  }, [sortedRows, search, deletedRows, isSearchEmpty])

  // usePaginationフックを使用して、ページネーションの状態を定義します
  const {
    page,
    itemsPerPage,
    handlePageChange,
    handleDirectPageChange, // ページを直接変更する関数
  } = usePagination({
    page: 1,
    itemsPerPage: 5,
  })

  // page: 1, itemsPerPage: 10 という初期値を設定しています
  const pageCount = Math.ceil(filteredAndSortedRows.length / itemsPerPage)
  const paginatedRows = filteredAndSortedRows.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  )

  // 削除ボタンのハンドラを定義します
  const handleDelete = (rowId: string) => {
    setDeletedRows([...deletedRows, rowId])
    setFilteredAndSortedRows(
      filteredAndSortedRows.filter((row) => row.id.toString() !== rowId),
    )
  }

  // 検索フィールドの変更ハンドラを定義します
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value),
      setFilteredAndSortedRows(
        sortedRows.filter((row) => multiFieldSearch(row, search)),
      )
    // 強制的にページを1に戻す
    handleDirectPageChange(1)
  }

  // 検索フィールドをクリアする関数を定義します
  function handleClearSearch(): void {
    setSearch('')
  }

  // キーボードショートカットを定義します
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

  // これは、Tableコンポーネントのcolumnsプロパティに渡す値です
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

  // 列の表示状態を管理するカスタムフックを使用します
  const {
    hiddenColumns,
    toggleColumnVisibility,
    hideAllColumns,
    showAllColumns,
  } = useColumnSelector(columns)

  // 削除された行と列をフィルタリングします
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
          {/* // これは、ColumnSelectorコンポーネントを呼び出すコードです */}
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
          {/* // これは、TableHeadコンポーネントのchildrenプロパティに渡す値です */}
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
                    {/* // これは、TableBodyコンポーネントのchildrenプロパティに渡す値です */}
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

      {/* // これは、ページネーションを表示するコードです */}
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
