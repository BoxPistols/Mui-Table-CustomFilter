import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const PagenateDesign = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 1,
      }}
    >
      {children}
    </Box>
  )
}
