import { useState, useEffect } from 'react'

export const useFilter = <T extends object>(
  initialRows: T[],
  search: string,
  filterKeys: (keyof T)[],
) => {
  const [filteredRows, setFilteredRows] = useState<T[]>(initialRows)

  useEffect(() => {
    setFilteredRows(
      initialRows.filter((row) =>
        filterKeys.some((key) =>
          String(row[key]).toLowerCase().includes(search.toLowerCase()),
        ),
      ),
    )
  }, [search, initialRows, filterKeys])

  return filteredRows
}
