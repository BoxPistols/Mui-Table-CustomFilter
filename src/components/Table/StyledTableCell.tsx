import { TableCell, tableCellClasses } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  maxHeight: '2.5em',
  padding: '0.75em 1.25em',
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 700,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    cursor: 'pointer',
    paddingLeft: '1.5em',
    position: 'relative',
    fontSize: 15,
    whiteSpace: 'nowrap',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingLeft: '1.75em',
  },
}))
