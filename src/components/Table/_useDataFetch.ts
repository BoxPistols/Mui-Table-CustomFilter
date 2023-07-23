// useDataFetch.ts
import { useEffect, useState } from 'react'

export const useDataFetch = (url: string) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(url)
        const data = await response.json()
        setData(data.products)
      } catch (error) {
        setError(null as null);
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { data, isLoading, error }
}
