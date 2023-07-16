// useSearch.ts
import { useState } from 'react'

export const useSearch = (initialQuery: string = '') => {
  const [query, setQuery] = useState(initialQuery)

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery)
  }

  return {
    query,
    handleQueryChange,
  }
}
