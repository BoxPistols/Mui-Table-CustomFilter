import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    cursor: 'pointer', // Add cursor pointer
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const initialRows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
  // ======= 検索フィルター
  const [search, setSearch] = useState('');

  const handleSearchChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(e.target.value);
  };

  const filteredRows = initialRows.filter((row) => row.name.includes(search));

  // ======= Sortフィルター
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field: string | React.SetStateAction<null>) => {
    let direction = 'asc';
    if (sortField === field && sortDirection === 'asc') {
      direction = 'desc';
    }
    setSortField(field);
    setSortDirection(direction);
  };

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const SortIcon =
    sortDirection === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;

  return (
    <div>
      <FormControl>
        <Box display="flex" alignItems="baseline">
          <TextField
            id="aaa"
            value={search}
            onChange={handleSearchChange}
            variant="outlined"
            margin="normal"
            size="small"
            sx={{ marginBottom: 2 }}
          />
          <FormLabel htmlFor="aaa" sx={{ position: 'relative', marginLeft: 1 }}>
            テーブル検索
          </FormLabel>
        </Box>
      </FormControl>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell onClick={() => handleSort('name')}>
                Dessert (100g serving)
                {sortField === 'name' && SortIcon}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                onClick={() => handleSort('calories')}
              >
                Calories
                {sortField === 'calories' && SortIcon}
              </StyledTableCell>
              <StyledTableCell align="right" onClick={() => handleSort('fat')}>
                Fat&nbsp;(g)
                {sortField === 'fat' && SortIcon}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                onClick={() => handleSort('carbs')}
              >
                Carbs&nbsp;(g)
                {sortField === 'carbs' && SortIcon}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                onClick={() => handleSort('protein')}
              >
                Protein&nbsp;(g)
                {sortField === 'protein' && SortIcon}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
