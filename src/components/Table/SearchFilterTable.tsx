import * as React from "react"
import { useState } from "react"
import {
  Table, TableBody, TableContainer, TableHead, TableRow, Paper, IconButton, Typography
} from "@mui/material"
import { StyledTableCell } from "./StyledTableCell"
import { StyledTableRow } from "./StyledTableRow"
import { SearchInput } from "./SearchInput"
import { ArrowDownward, ArrowUpward, Delete, Edit, Visibility } from "@mui/icons-material"

type RowData = {
  name: string
  calories: number
  fat: number
  carbs: number
  protein: number
}

const initialRows = [
  { name: "Frozen yoghurt", calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Ice cream sandwich", calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
  { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
  { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
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

// Dummy random data generator
function createRandomData() {
  const randomKey = generateRandomKey(10)
  const randomValue1 = Math.floor(Math.random() * 1000)
  const randomValue2 = Math.floor(Math.random() * 100)
  const randomValue3 = Math.floor(Math.random() * 100)
  const randomValue4 = Math.floor(Math.random() * 15)

  return { name: randomKey, calories: randomValue1, fat: randomValue2, carbs: randomValue3, protein: randomValue4 }
}

const numberOfEntries = 3 // Number of data entries to add

for (let i = 0; i < numberOfEntries; i++) {
  const newData = createRandomData()
  initialRows.push(newData)
}

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
      <ArrowUpward sx={{ fontSize: 20, position: "absolute", top: "0.75em", padding: "0 2px" }} />
    ) : (
      <ArrowDownward sx={{ fontSize: 20, position: "absolute", top: "0.75em", padding: "0 2px" }} />
    )

  return (
    <>
      <SearchInput
        search={search}
        handleSearchChange={handleSearchChange}
        handleClearSearch={handleClearSearch}
        isSearchEmpty={isSearchEmpty}
      />

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
