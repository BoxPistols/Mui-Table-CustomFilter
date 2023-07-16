// useSort.ts
import { useState } from 'react'

export const useSort = <T, K extends keyof T>(initialRows: T[]) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const [sortField, setSortField] = useState<K | ''>('')

  const handleSort = (field: K | string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortField === field && sortDirection === 'asc') {
      direction = 'desc'
    }
    setSortField((prevSortField: '' | K) => {
      if (prevSortField === field) {
        return direction === 'asc' ? '' : (field as K)
      }
      return field as K
    })
    setSortDirection(direction)
  }

  const sortedRows = [...initialRows].sort((a, b) => {
    if (sortField === '') {
      return 0
    }
    if (a[sortField] < b[sortField]) {
      return sortDirection === 'asc' ? -1 : 1
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === 'asc' ? 1 : -1
    }
    return 0
  })

  return { sortedRows, handleSort, sortField, sortDirection }
}
