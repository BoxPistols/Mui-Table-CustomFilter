import * as React from "react"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Box, FormControl, FormLabel, IconButton, TextField, Typography } from "@mui/material"
import { useState } from "react"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import { Delete, Edit, Visibility, Clear } from "@mui/icons-material"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  maxHeight: "2.5em",
  padding: "0.75em 1.25em",
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 700,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    cursor: "pointer",
    paddingLeft: "1.5em",
    position: "relative",
    fontSize: 15,
    whiteSpace: "nowrap",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingLeft: "1.75em",
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))

type RowData = {
  name: string
  calories: number
  fat: number
  carbs: number
  protein: number
}

function createData(name: string, calories: number, fat: number, carbs: number, protein: number): RowData {
  return { name, calories, fat, carbs, protein }
}

const initialRows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  // Add More Data dummy random key value Here
]

// Dummy random key generator
function generateRandomKey(length: number) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let key = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    key += characters.charAt(randomIndex)
  }
  return key
}

const numberOfEntries = 3 // Number of data entries to add
const keyLength = 10 // Length of the generated random key

for (let i = 0; i < numberOfEntries; i++) {
  const randomKey = generateRandomKey(keyLength)
  const randomValue1 = Math.floor(Math.random() * 1000)
  const randomValue2 = Math.floor(Math.random() * 100)
  const randomValue3 = Math.floor(Math.random() * 100)
  const randomValue4 = Math.floor(Math.random() * 15)

  const newData = createData(randomKey, randomValue1, randomValue2, randomValue3, randomValue4)
  initialRows.push(newData)
}

// Avtion Cell
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleAction = (action: string, row: any) => {
  switch (action) {
    case "detail":
      alert(`${row.name} の詳細です \n ${JSON.stringify(row)}`)
      break
    case "edit":
      alert(`編集: ${row.name} の編集ページに移動`)
      break
    case "delete":
      if (window.confirm(`${row.name} を消去してもよろしいですか?`)) {
        alert(`${row.name} を消去しました`)
      } else {
        alert(`${row.name} を消去しませんでした`)
      }
      break
    default:
      break
  }
}

export const SearchFilterTable = () => {
  const [search, setSearch] = useState<string>("")
  const isSearchEmpty = search === ""

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleClearSearch = () => {
    setSearch("")
  }

  const filteredRows = initialRows.filter((row) => row.name.toLowerCase().includes(search.toLowerCase()))

  const [sortField, setSortField] = useState<keyof RowData | "">("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: keyof RowData) => {
    let direction: "asc" | "desc" = "asc"
    if (sortField === field && sortDirection === "asc") {
      direction = "desc"
    }
    setSortField(field)
    setSortDirection(direction)
  }

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (sortField === "") {
      return 0
    }
    if (a[sortField] < b[sortField]) {
      return sortDirection === "asc" ? -1 : 1
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === "asc" ? 1 : -1
    }
    return 0
  })

  const SortIcon =
    sortDirection === "asc" ? (
      <ArrowUpwardIcon sx={{ fontSize: 20, position: "absolute", top: "0.75em", padding: "0 2px" }} />
    ) : (
      <ArrowDownwardIcon sx={{ fontSize: 20, position: "absolute", top: "0.75em", padding: "0 2px" }} />
    )

  return (
    <>
      <FormControl>
        <Box display="flex" flexDirection="column">
          <FormLabel htmlFor="search-input" sx={{ position: "relative", marginBottom: -1.5, fontSize: 12 }}>
            データ検索
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
              minWidth: "20em",
            }}
          />
          {!isSearchEmpty && (
            <IconButton onClick={handleClearSearch} sx={{ position: "absolute", top: "0.85em", right: 0 }}>
              <Clear sx={{ fontSize: 18 }} />
            </IconButton>
          )}
        </Box>
      </FormControl>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700, minHeight: 300 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell onClick={() => handleSort("name")}>
                Dessert (100g serving)
                {sortField === "name" && SortIcon}
              </StyledTableCell>
              <StyledTableCell onClick={() => handleSort("calories")}>
                Calories
                {sortField === "calories" && SortIcon}
              </StyledTableCell>
              <StyledTableCell onClick={() => handleSort("fat")}>
                Fat&nbsp;(g)
                {sortField === "fat" && SortIcon}
              </StyledTableCell>
              <StyledTableCell onClick={() => handleSort("carbs")}>
                Carbs&nbsp;(g)
                {sortField === "carbs" && SortIcon}
              </StyledTableCell>
              <StyledTableCell onClick={() => handleSort("protein")}>
                Protein&nbsp;(g)
                {sortField === "protein" && SortIcon}
              </StyledTableCell>
              <StyledTableCell align="center" width={140}>
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.length > 0 ? (
              sortedRows.map((row) => (
                <StyledTableRow key={row.name}>
                  {" "}
                  <>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell>{row.calories}</StyledTableCell>
                    <StyledTableCell>{row.fat}</StyledTableCell>
                    <StyledTableCell>{row.carbs}</StyledTableCell>
                    <StyledTableCell>{row.protein}</StyledTableCell>
                    <StyledTableCell align="right" width={140} sx={{ whiteSpace: "nowrap" }}>
                      {/* Action Cell */}
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
                  </>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableCell component="th" scope="row" colSpan={5} sx={{ textAlign: "center" }}>
                <Typography variant="h5">No results found.</Typography>
              </StyledTableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
