// FilterForm.tsx
import { useState } from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from '@mui/material'

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
  onFilterChange: (filters: Record<string, string>) => void
  uniqueValues: Record<string, string[]>
  onClickClearFilters: () => void
}

/**
 * フィルターフォームコンポーネントを定義します。
 * 各テーブル列のフィルターを選択するSelectと全フィルターをクリアするボタンを表示します。
 */
export const FilterForm = ({
  columns,
  onFilterChange,
  uniqueValues,
  onClickClearFilters,
}: FilterFormProps) => {
  const initialFilterValue = ''
  const [filters, setFilters] = useState<Record<string, string>>(
    columns.reduce(
      (acc, column) => ({
        ...acc,
        [column.key]: initialFilterValue,
      }),
      {},
    ),
  )

  /**
   * フィルターが変更されたときに実行されるハンドラ
   * 新しいフィルターの状態を設定し、フィルターの変更イベントを親に通知します。
   */
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const newFilters = {
      ...filters,
      [event.target.name]: event.target.value || initialFilterValue,
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
    setFilters(
      columns.reduce(
        (acc, column) => ({
          ...acc,
          [column.key]: initialFilterValue,
        }),
        {},
      ),
    )
  }

  /**
   * フィルターフォームのレンダリング
   */
  return (
    <Box
      display="flex"
      alignItems="flex-end"
      sx={{ gap: 2, flexWrap: 'wrap', mb: 2 }}
    >
      {/* // 各テーブル列のフィルターを選択するSelectを表示します。 */}
      {columns.map((column: Column) => (
        <FormControl
          key={column.key}
          variant="outlined"
          size="small"
          sx={{ minWidth: 180 }}
        >
          {/* // フィルターのラベルを表示します。 */}
          <InputLabel
            id={`${column.key}-filter-label`}
            shrink
            htmlFor=""
            sx={{ position: 'relative', top: '10px', left: '-12px' }}
          >
            {column.label}
          </InputLabel>
          {/* // フィルターの状態を設定し、フィルターの変更イベントを親に通知します。 */}
          <Select
            // フィルターの状態を設定します。
            inputProps={{ shrink: true }}
            // フィルターのラベルを設定します。
            labelId={`${column.key}-filter-label`}
            id={`${column.key}-filter`}
            name={column.key}
            // フィルターの状態を設定します。
            value={filters[column.key] || initialFilterValue}
            // フィルターの状態が変更されたときに実行されるハンドラを設定します。
            onChange={handleFilterChange}
            label={column.label}
            // フィルターの選択肢のスタイルを設定します。
            sx={{
              maxWidth: 240,
              color: 'text.primary',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'text.primary',
              },
            }}
          >
            {/* // フィルターの選択肢を表示します。 */}
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {/* // フィルターの選択肢を表示します。 */}
            {uniqueValues[column.key]?.map((value: string) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
      {/* // 全てのフィルターをクリアするボタンを表示します。 */}
      <Button
        onClick={clearFilters}
        variant="outlined"
        sx={{ display: 'block', minWidth: 180, minHeight: 38 }}
      >
        Clear All Filters
      </Button>
    </Box>
  )
}
