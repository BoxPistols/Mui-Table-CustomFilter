import { useState, useEffect } from 'react'

export const useFilter = <T extends object>(
  initialRows: T[],
  search: string,
) => {
  const [filteredRows, setFilteredRows] = useState<T[]>(initialRows)

  useEffect(() => {
    setFilteredRows(
      initialRows.filter((row) =>
        Object.keys(row).some((key) =>
          String(row[key as keyof T])
            .toLowerCase()
            .includes(search.toLowerCase()),
        ),
      ),
    )
  }, [search, initialRows])

  return filteredRows
}
