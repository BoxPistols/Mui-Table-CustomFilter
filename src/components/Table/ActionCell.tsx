// ActionCell.tsx
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
}

export const ActionCell = ({ row }: ActionCellProps) => {
  const handleAction = (action: string) => {
    switch (action) {
      case "detail":
        alert(`${row.name} の詳細です \n ${JSON.stringify(row)}`)
        break
      case "edit":
        alert(`編集: ${row.name} の編集ページに移動`)
        break
      case "delete":
        if (window.confirm(`${row.name} を消去してもよろしいですか?`)) {
          alert(`${row.name} を消去しました`)
        } else {
          alert(`${row.name} を消去しませんでした`)
        }
        break
      default:
        break
    }
  }

  return (
    <>
      <IconButton onClick={() => handleAction("detail")}>
        <Visibility />
      </IconButton>
      <IconButton onClick={() => handleAction("edit")}>
        <Edit />
      </IconButton>
      <IconButton onClick={() => handleAction("delete")}>
        <Delete />
      </IconButton>
    </>
  )
}
