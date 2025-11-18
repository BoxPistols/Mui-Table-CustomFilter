// FilterForm.tsx
import { useMemo, useState } from 'react'
import { Box, FormControl, Select, MenuItem, SelectChangeEvent, Button, Typography } from '@mui/material'
import { MultiSelectChips, Option } from './MultiSelectChips'
import { RangeInputs, RangeFilter } from './RangeInputs'

/**
 * 各テーブル列の情報を表す型
 */
interface Column {
  key: string
  label: string | JSX.Element | JSX.Element[] | undefined
}

/**
 * FilterFormコンポーネントのプロパティを表す型
 */
interface FilterFormProps {
  columns: Column[]
  onFilterChange: (filters: Record<string, string | string[] | RangeFilter>) => void
  uniqueValues: Record<string, string[]>
  onClickClearFilters: () => void
  multiSelectKeys?: string[]
  rangeKeys?: string[]
  rangeOptions?: Record<string, { step?: number; min?: number; max?: number }>
}

/**
 * フィルターフォームコンポーネントを定義します。
 * 各テーブル列のフィルターを選択するSelectと全フィルターをクリアするボタンを表示します。
 */
export const FilterForm = ({ columns, onFilterChange, uniqueValues, onClickClearFilters, multiSelectKeys = [], rangeKeys = [], rangeOptions = {} }: FilterFormProps) => {
  const singleInitial = ""
  const multiInitial: string[] = []
  const rangeInitial: RangeFilter = {}
  const [filters, setFilters] = useState<Record<string, string | string[] | RangeFilter>>(
    columns.reduce<Record<string, string | string[] | RangeFilter>>((acc, column) => {
      if (multiSelectKeys.includes(column.key)) acc[column.key] = multiInitial
      else if (rangeKeys.includes(column.key)) acc[column.key] = rangeInitial
      else acc[column.key] = singleInitial
      return acc
    }, {})
  )

  /**
   * フィルターが変更されたときに実行されるハンドラ
   * 新しいフィルターの状態を設定し、フィルターの変更イベントを親に通知します。
   */
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const newFilters = {
      ...filters,
      [event.target.name]: event.target.value || singleInitial,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  /**
   * フィルターをクリアするハンドラ
   * 全てのフィルターを初期値にリセットし、親にクリアイベントを通知します。
   */
  const clearFilters = () => {
    onClickClearFilters()
    const cleared = columns.reduce<Record<string, string | string[] | RangeFilter>>((acc, column) => {
      if (multiSelectKeys.includes(column.key)) acc[column.key] = multiInitial
      else if (rangeKeys.includes(column.key)) acc[column.key] = rangeInitial
      else acc[column.key] = singleInitial
      return acc
    }, {})
    setFilters(cleared)
    onFilterChange(cleared)
  }

  const asOptions = (values: string[] | undefined): Option[] =>
    (values ?? []).map((v) => ({ label: v, value: v }))

  /**
   * フィルターフォームのレンダリング
   */
  return (
    <Box display='flex' alignItems="flex-end" sx={{ gap: 2, flexWrap: 'wrap', mb: 1 }}>
      {columns.map((column: Column) => {
        const isMulti = multiSelectKeys.includes(column.key)
        const isRange = rangeKeys.includes(column.key)
        if (isMulti) {
          const selected = (filters[column.key] as string[]) ?? []
          const options = asOptions(uniqueValues[column.key])
          return (
            <Box key={column.key} sx={{ minWidth: 280 }}>
              <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                {column.label}
              </Typography>
              <MultiSelectChips
                options={options}
                value={selected}
                onChange={(next) => {
                  const updated = { ...filters, [column.key]: next }
                  setFilters(updated)
                  onFilterChange(updated)
                }}
              />
            </Box>
          )
        }
        if (isRange) {
          const selected = (filters[column.key] as RangeFilter) ?? {}
          const opts = rangeOptions[column.key] ?? {}
          return (
            <Box key={column.key} sx={{ minWidth: 280 }}>
              <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                {column.label}
              </Typography>
              <RangeInputs
                value={selected}
                step={opts.step}
                min={opts.min}
                max={opts.max}
                onChange={(next) => {
                  const updated = { ...filters, [column.key]: next }
                  setFilters(updated)
                  onFilterChange(updated)
                }}
              />
            </Box>
          )
        }
        return (
          <Box key={column.key} sx={{ minWidth: 240 }}>
            <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
              {column.label}
            </Typography>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 240 }}>
              <Select
                id={`${column.key}-filter`}
                name={column.key}
                value={(filters[column.key] as string) || singleInitial}
                onChange={handleFilterChange}
                displayEmpty
                sx={{ color: 'text.primary', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'text.primary' } }}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {uniqueValues[column.key]?.map((value: string) => (
                  <MenuItem key={value} value={value}>{value}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )
      })}
      <Button onClick={clearFilters} variant="outlined" sx={{ display: 'block', minWidth: 180, minHeight: 38 }}>Clear All Filters</Button>
    </Box >
  )
}
