// name: SearchFilterTable.tsx
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'

type SortIconProps = {
  direction: 'asc' | 'desc' | 'none'
}

export const SortIcon = ({ direction }: SortIconProps) => {
  const commonSx = {
    fontSize: 18,
    ml: 0.5,
    verticalAlign: 'middle',
  } as const

  if (direction === 'asc') {
    return <ArrowUpwardIcon sx={{ ...commonSx }} />
  }
  if (direction === 'desc') {
    return <ArrowDownwardIcon sx={{ ...commonSx }} />
  }
  // 未ソート時でも常に可視化（ユーザに並び替え可能だと気づいてもらう）
  return <UnfoldMoreIcon sx={{ ...commonSx, opacity: 0.65 }} />
}
