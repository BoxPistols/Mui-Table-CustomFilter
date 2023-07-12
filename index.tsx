import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import SearchFilterTable from './SearchFilterTable';
import ApiFilterTable from './ApiFilterTable';

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <h1>Filter Table</h1>

      <h2>ApiFilterTable</h2>
      <ApiFilterTable />

      <h2>SearchFilterTable</h2>
      <SearchFilterTable />
    </StyledEngineProvider>
  </React.StrictMode>
);
