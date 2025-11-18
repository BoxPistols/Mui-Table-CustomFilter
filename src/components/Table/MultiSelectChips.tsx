import { useMemo } from 'react'
import { Stack, Chip } from '@mui/material'

export type Option = { label: string; value: string }

type MultiSelectChipsProps = {
  options: Option[]
  value: string[]
  onChange: (next: string[]) => void
  label?: string
}

export function MultiSelectChips({
  options,
  value,
  onChange,
}: MultiSelectChipsProps) {
  const selectedSet = useMemo(() => new Set(value), [value])

  const toggle = (val: string) => {
    const next = new Set(selectedSet)
    if (next.has(val)) next.delete(val)
    else next.add(val)
    onChange(Array.from(next))
  }

  const remove = (val: string) => {
    if (!selectedSet.has(val)) return
    onChange(value.filter((v) => v !== val))
  }

  return (
    <Stack spacing={0.75}>
      <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
        {options.map((opt) => {
          const active = selectedSet.has(opt.value)
          return (
            <Chip
              key={opt.value}
              label={opt.label}
              variant={active ? 'filled' : 'outlined'}
              color={active ? 'primary' : 'default'}
              onClick={() => toggle(opt.value)}
              sx={{ mb: 0.5 }}
            />
          )
        })}
      </Stack>
      <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
        {value.map((v) => {
          const opt = options.find((o) => o.value === v)
          if (!opt) return null
          return (
            <Chip
              key={v}
              label={opt.label}
              color="primary"
              onDelete={() => remove(v)}
              sx={{ mb: 0.5 }}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}


