import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, FormControl, FormLabel, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

/* API
{
  "id": 1,
  "title": "iPhone 9",
  "description": "An apple mobile which is nothing like apple",
  "price": 549,
  "discountPercentage": 12.96,
  "rating": 4.69,
  "stock": 94,
  "brand": "Apple",
  "category": "smartphones",
  "thumbnail": "...",
  "images": ["...", "...", "..."]
 */

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    cursor: 'pointer',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState([]);

  // https://dummyjson.com/docs/products
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => setRows(data.products));
  }, []);

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const filteredRows = rows.filter((row) => row.title.includes(search));

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
              <StyledTableCell onClick={() => handleSort('title')}>
                Title
                {sortField === 'title' && SortIcon}
              </StyledTableCell>
              <StyledTableCell onClick={() => handleSort('price')}>
                Price
                {sortField === 'price' && SortIcon}
              </StyledTableCell>
              <StyledTableCell onClick={() => handleSort('stock')}>
                Stock
                {sortField === 'stock' && SortIcon}
              </StyledTableCell>
              <StyledTableCell onClick={() => handleSort('rating')}>
                rating
                {sortField === 'rating' && SortIcon}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell>{row.price}</StyledTableCell>
                <StyledTableCell>{row.stock}</StyledTableCell>
                <StyledTableCell>{row.rating}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
