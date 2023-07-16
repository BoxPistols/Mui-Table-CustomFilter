// name: ColumnToggleMenuItem.tsx
import React from 'react'
import { MenuItem, FormControlLabel, Switch } from '@mui/material'

type ColumnToggleMenuItemProps = {
  column: { field: string; headerName: string }
  hidden: boolean
  onToggle: () => void
}

const ColumnToggleMenuItem: React.FC<ColumnToggleMenuItemProps> = ({
  column,
  hidden,
  onToggle,
}) => {
  return (
    <MenuItem key={column.field} sx={{ minWidth: 180, pl: 3, pt: 0 }}>
      <FormControlLabel
        control={<Switch checked={!hidden} onChange={onToggle} size="small" />}
        label={column.headerName}
      />
    </MenuItem>
  )
}

export default ColumnToggleMenuItem
