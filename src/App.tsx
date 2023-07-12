import { Divider, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { ApiFilterTable } from "./components/Table/ApiFilterTable";
import { SearchFilterTable } from "./components/Table/SearchFilterTable";
import "./App.css";

function App() {
  return (
    <>
      <Container>
        <Typography variant="h1">Filter Table</Typography>

        <Typography variant="h2">SearchFilterTable</Typography>
        <SearchFilterTable />

        <Divider sx={{ my: 4 }} />

        <Typography variant="h2">ApiFilterTable</Typography>
        <ApiFilterTable />
      </Container>
    </>
  );
}

export default App;
