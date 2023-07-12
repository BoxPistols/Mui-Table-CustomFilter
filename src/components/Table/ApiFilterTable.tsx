import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Visibility, Edit, Delete, Clear } from "@mui/icons-material";

// API data type
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  maxHeight: "2.5em",
  padding: "0.75em 1.25em",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    cursor: "pointer",
    fontWeight: 700,
    paddingLeft: "1.5em",
    position: "relative",
    fontSize: 15,
    whiteSpace: "nowrap"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingLeft: "1.75em",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Action Cell
const handleAction = (action: string, row: Product) => {
  switch (action) {
    case "detail":
      alert(`${row.title} の詳細です \n ${JSON.stringify(row)}`);
      break;
    case "edit":
      // TODO: Implement edit action.
      alert(`${row.title} を開き編集します \n 編集ページ \n ${row.id}`);
      break;
    case "delete":
      if (window.confirm(`${row.title} を消去してもよろしいですか?`)) {
        // TODO: Implement delete action.
        alert(`${row.title} を消去しました`);
      } else {
        alert(`${row.title} を消去しませんでした`);
      }
      break;
    default:
      break;
  }
};

export const ApiFilterTable = () => {
  const [search, setSearch] = useState("");
  const isSearchEmpty = search === "";

  const [rows, setRows] = useState<Product[]>([]); // Defined rows as Product array

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setRows(data.products));
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  const filteredRows = rows.filter((row) =>
    row.title.toLowerCase().includes(search.toLowerCase())
  );

  const [sortField, setSortField] = useState<keyof Product | null>(null); // Defined sortField as keyof Product
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (field: keyof Product) => {
    // Defined field as keyof Product
    let direction = "asc";
    if (sortField === field && sortDirection === "asc") {
      direction = "desc";
    }
    setSortField(field);
    setSortDirection(direction);
  };

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (sortField === null) return 0;
    if (a[sortField] < b[sortField]) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const SortIcon =
    sortDirection === "asc" ? <ArrowUpwardIcon sx={{ fontSize: 16, position: "absolute", top: "1em", padding: "0 2px" }} /> : <ArrowDownwardIcon sx={{ fontSize: 16, position: "absolute", top: "1em", padding: "0 2px" }} />;

  // Pagination states
  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const pageCount = Math.ceil(sortedRows.length / itemsPerPage);
  const paginatedRows = sortedRows.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <FormControl>
        <Box display="flex" flexDirection="column">
          <FormLabel htmlFor="search-input" sx={{ position: "relative", marginBottom: -2, fontSize: 12 }}>
            テーブル検索
          </FormLabel>
          <TextField
            id="search-input"
            value={search}
            onChange={handleSearchChange}
            variant="outlined"
            margin="normal"
            size="small"
            sx={{
              position: "relative",
              marginBottom: 2,
              paddingRight: "2em"
            }}
          />
          {!isSearchEmpty && (
            <IconButton onClick={handleClearSearch} sx={{ position: "absolute", top: "0.85em", right: 30, }}>
              <Clear sx={{ fontSize: 18 }} />
            </IconButton>
          )}
        </Box>
      </FormControl>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700, minHeight: 300 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell onClick={() => handleSort("title")}>
                Title
                {sortField === "title" && SortIcon}
              </StyledTableCell>
              <StyledTableCell onClick={() => handleSort("price")}>
                Price
                {sortField === "price" && SortIcon}
              </StyledTableCell>
              <StyledTableCell onClick={() => handleSort("stock")}>
                Stock
                {sortField === "stock" && SortIcon}
              </StyledTableCell>
              <StyledTableCell onClick={() => handleSort("rating")}>
                rating
                {sortField === "rating" && SortIcon}
              </StyledTableCell>
              <StyledTableCell align="center" width={140}>
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell>{row.price}</StyledTableCell>
                  <StyledTableCell>{row.stock}</StyledTableCell>
                  <StyledTableCell>{row.rating}</StyledTableCell>
                  <StyledTableCell align="right" width={140} sx={{ whiteSpace: "nowrap" }}>
                    <IconButton onClick={() => handleAction("detail", row)}>
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleAction("edit", row)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleAction("delete", row)}>
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  component="th"
                  scope="row"
                  colSpan={5}
                  sx={{ textAlign: "center" }}
                >
                  <Typography variant="h5">No results found.</Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>{" "}
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 1,
        }}
      >
        <Typography>
          <Typography component="span" variant="caption">Total records: {sortedRows.length} / </Typography>
          <Typography component="span" variant="caption">Total pages: {pageCount} / </Typography>
          <Typography component="span" variant="caption">Current page: {page}</Typography>
        </Typography>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
};
