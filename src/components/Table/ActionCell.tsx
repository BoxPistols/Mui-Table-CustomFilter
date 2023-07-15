import { FC } from "react"
import { IconButton } from "@mui/material"
import { Delete, Edit, Visibility } from "@mui/icons-material"

type RowData = {
  name: string
  calories: number
  fat: number
  carbs: number
  protein: number
}

type ActionCellProps = {
  row: RowData
  handleAction: (action: string, row: RowData) => void
}

export const ActionCell: FC<ActionCellProps> = ({ row, handleAction }) => (
  <div>
    <IconButton onClick={() => handleAction("detail", row)}>
      <Visibility />
    </IconButton>
    <IconButton onClick={() => handleAction("edit", row)}>
      <Edit />
    </IconButton>
    <IconButton onClick={() => handleAction("delete", row)}>
      <Delete />
    </IconButton>
  </div>
)