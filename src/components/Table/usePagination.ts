// usePagination.ts
import { ChangeEvent, useState } from 'react'

type PaginationState = {
  page: number
  itemsPerPage: number
}

export const usePagination = (initialState: PaginationState) => {
  const [page, setPage] = useState(initialState.page)
  const [itemsPerPage, setItemsPerPage] = useState(initialState.itemsPerPage)

  const handlePageChange = (_event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
  }

  const handleDirectPageChange = (newPage: number) => {
    setPage(newPage)
  }

  return {
    page,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    handleDirectPageChange, // New function is now part of the hook's returned value
  }
}
