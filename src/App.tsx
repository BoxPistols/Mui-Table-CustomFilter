import { Divider, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { ApiFilterTable } from './components/Table/ApiFilterTable'
import { BasicTable } from './components/Table/BasicTable'
import { SearchFilterTable } from './components/Table/SearchFilterTable'
import './App.css'

function App() {
  return (
    <>
      <Container sx={{ p: 2, pb: 10 }}>
        <Typography variant="h1">Filter Table</Typography>
        <Divider sx={{ my: 4 }} />

        <Typography variant="h2">BasicTable</Typography>
        <BasicTable />

        <Divider sx={{ my: 4 }} />

        <Typography variant="h2">ApiFilterTable</Typography>
        <ApiFilterTable />

        <Divider sx={{ my: 4 }} />

        <Typography variant="h2">SearchFilterTable</Typography>
        <SearchFilterTable />
      </Container>
    </>
  )
}

export default App
