// ActionCell.tsx
import { IconButton } from '@mui/material'
import { Delete, Edit, Visibility } from '@mui/icons-material'

// これは ActionCellProps という型を定義していて、データの型は Record<string, unknown> としています
type ActionCellProps = {
  row: Record<string, unknown>
}

export const ActionCell = ({ row }: ActionCellProps) => {
  const handleAction = (action: string) => {
    switch (action) {
      case 'detail':
        alert(`${row.title} の詳細です \n ${JSON.stringify(row)}`)
        break
      case 'edit':
        alert(`編集: ${row.title} の編集ページに移動`)
        break
      case 'delete':
        if (window.confirm(`${row.title} を消去してもよろしいですか?`)) {
          alert(`${row.title} を消去しました`)
        } else {
          alert(`${row.title} を消去しませんでした`)
        }
        break
      default:
        break
    }
  }

  return (
    <>
      <IconButton onClick={() => handleAction('detail')}>
        <Visibility />
      </IconButton>
      <IconButton onClick={() => handleAction('edit')}>
        <Edit />
      </IconButton>
      <IconButton onClick={() => handleAction('delete')}>
        <Delete />
      </IconButton>
    </>
  )
}
