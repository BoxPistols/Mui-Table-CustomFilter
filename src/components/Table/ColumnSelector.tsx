// ColumnSelector.tsx
import {
  IconButton,
  Menu,
  MenuItem,
  FormControlLabel,
  Switch,
  Button,
  Box,
} from '@mui/material'
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined'
import React from 'react'

type Column = {
  label: string
  key: string
}

type ColumnSelectorProps = {
  columns: Column[]
  hiddenColumns: string[]
  toggleColumnVisibility: (field: string) => void
  hideAllColumns: () => void
  showAllColumns: () => void
}

export const ColumnSelector = ({
  columns,
  hiddenColumns,
  toggleColumnVisibility,
  hideAllColumns,
  showAllColumns,
}: ColumnSelectorProps) => {
  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <ToggleOnOutlinedIcon sx={{ fontSize: 38 }} color="primary" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {columns.map((column) => (
          <MenuItem key={column.key} sx={{ minWidth: 180, pl: 3, pt: 0 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={!hiddenColumns.includes(column.key)}
                  onChange={() => toggleColumnVisibility(column.key)}
                  size="small"
                />
              }
              label={column.label}
            />
          </MenuItem>
        ))}
        <Box display="flex">
          <MenuItem>
            <MenuItem>
              <Button variant="contained" onClick={showAllColumns} size="small">
                全て表示
              </Button>
            </MenuItem>
            <Button variant="outlined" onClick={hideAllColumns} size="small">
              全て非表示
            </Button>
          </MenuItem>
        </Box>
        <Box display="flex" justifyContent="center">
          <MenuItem>
            <Button
              variant="text"
              color="secondary"
              onClick={handleClose}
              size="small"
            >
              閉じる
            </Button>
          </MenuItem>
        </Box>
      </Menu>
    </>
  )
}
