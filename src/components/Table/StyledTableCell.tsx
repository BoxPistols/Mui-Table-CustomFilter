import { TableCell, tableCellClasses } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  maxHeight: '2.4em',
  padding: '0.5em 1em',
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 700,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    cursor: 'pointer',
    paddingLeft: '1.25em',
    position: 'relative',
    fontSize: 15,
    minWidth: 80,
    maxWidth: 180,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingLeft: '1.5em',
    minWidth: 80,
    maxWidth: 180,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}))
