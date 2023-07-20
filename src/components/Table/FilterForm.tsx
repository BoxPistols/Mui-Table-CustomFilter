import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import { useState, useEffect } from 'react'

interface Column {
  key: string
  label: string
}

interface FilterFormProps {
  columns: Column[]
  onFilterChange: (filters: Record<string, string>) => void
  uniqueValues: Record<string, string[]> // new prop for unique values of each column
}

export const FilterForm = ({
  columns,
  onFilterChange,
  uniqueValues, // receive uniqueValues as a prop
}: FilterFormProps) => {
  const [filters, setFilters] = useState<Record<string, string>>({})

  const handleFilterChange = (event: SelectChangeEvent) => {
    const newFilters = {
      ...filters,
      [event.target.name]: event.target.value,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  useEffect(() => {
    setFilters({})
  }, [columns])

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
      {columns.map((column: Column) => (
        <FormControl
          key={column.key}
          variant="outlined"
          size="small"
          sx={{ minWidth: 180 }}
        >
          <InputLabel id={`${column.key}-filter-label`}>
            {column.label}
          </InputLabel>
          <Select
            labelId={`${column.key}-filter-label`}
            id={`${column.key}-filter`}
            name={column.key}
            value={filters[column.key] || ''}
            onChange={handleFilterChange}
            label={column.label}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {/* Map over the unique values for the column */}
            {uniqueValues[column.key]?.map((value: string) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Box>
  )
}
