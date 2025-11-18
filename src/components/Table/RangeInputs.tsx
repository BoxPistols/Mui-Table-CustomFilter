import { Box, TextField } from '@mui/material'

export type RangeFilter = { min?: number; max?: number }

type RangeInputsProps = {
  value: RangeFilter
  onChange: (next: RangeFilter) => void
}

export function RangeInputs({ value, onChange }: RangeInputsProps) {
  const toDisplay = (n: number | undefined) => (typeof n === 'number' ? String(n) : '')
  const toNumber = (s: string): number | undefined => {
    if (s === '') return undefined
    const n = Number(s)
    return Number.isFinite(n) ? n : undefined
  }

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <TextField
        type="number"
        size="small"
        label="Min"
        value={toDisplay(value.min)}
        onChange={(e) => onChange({ ...value, min: toNumber(e.target.value) })}
        inputProps={{ min: 0 }}
        sx={{ width: 120 }}
      />
      <TextField
        type="number"
        size="small"
        label="Max"
        value={toDisplay(value.max)}
        onChange={(e) => onChange({ ...value, max: toNumber(e.target.value) })}
        inputProps={{ min: 0 }}
        sx={{ width: 120 }}
      />
    </Box>
  )
}


