// useColumnSelector.ts
import { useState } from 'react'

type Column = {
  label: string
  key: string
}

export const useColumnSelector = (columns: Column[]) => {
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

  return {
    hiddenColumns,
    toggleColumnVisibility,
    hideAllColumns,
    showAllColumns,
  }
}
