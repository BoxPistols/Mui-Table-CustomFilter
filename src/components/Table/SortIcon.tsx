import { FC } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

type SortIconProps = {
  direction: 'asc' | 'desc'
}

export const SortIcon: FC<SortIconProps> = ({ direction }) => {
  return direction === 'asc' ? (
    <ArrowUpwardIcon
      sx={{
        fontSize: 20,
        position: 'absolute',
        top: '0.75em',
        padding: '0 2px',
      }}
    />
  ) : (
    <ArrowDownwardIcon
      sx={{
        fontSize: 20,
        position: 'absolute',
        top: '0.75em',
        padding: '0 2px',
      }}
    />
  )
}
