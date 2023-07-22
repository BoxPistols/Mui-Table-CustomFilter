// file name is FilterForm.tsx
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from '@mui/material'
import { useState, useEffect } from 'react'

interface Column {
  key: string
  label: string | JSX.Element | JSX.Element[] | undefined
}

interface FilterFormProps {
  columns: Column[]
  onFilterChange: (filters: Record<string, string>) => void
  uniqueValues: Record<string, string[]>
  onClickClearFilters: () => void
}

export const FilterForm = ({
  columns,
  onFilterChange,
  uniqueValues,
  onClickClearFilters,
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
    <Box
      display='flex' alignItems="flex-end"
      sx={{ gap: 2, flexWrap: 'wrap', mb: 2 }}>
      {columns.map((column: Column) => (
        <FormControl
          key={column.key}
          variant="outlined"
          size="small"
          sx={{ minWidth: 180 }}
        >
          {/* Shrink */}
          <InputLabel
            id={`${column.key}-filter-label`}
            shrink
            htmlFor=""
            sx={{
              position: 'relative',
              top: '10px',
              left: '-12px',
            }}
          >
            {column.label}
          </InputLabel>
          <Select
            inputProps={{ shrink: true }}
            labelId={`${column.key}-filter-label`}
            id={`${column.key}-filter`}
            name={column.key}
            value={filters[column.key]}
            onChange={handleFilterChange}
            label={column.label}
            sx={{
              maxWidth: 240,
              color: 'text.primary',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'text.primary',
              },
            }}
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
      <Button onClick={() => onClickClearFilters()}
        variant="outlined"
        sx={{
          display: 'block',
          minWidth: 180,
          minHeight: 38,
          // mt: 2,
        }}
      >Clear All Filters</Button>
    </Box >
  )
}
