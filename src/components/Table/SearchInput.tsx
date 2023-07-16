import { FC, ChangeEvent } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  TextField,
} from '@mui/material'
import { Clear } from '@mui/icons-material'

type SearchInputProps = {
  search: string
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleClearSearch: () => void
  isSearchEmpty: boolean
}

export const SearchInput: FC<SearchInputProps> = ({
  search,
  handleSearchChange,
  handleClearSearch,
  isSearchEmpty,
}) => (
  <FormControl>
    <Box display="flex" flexDirection="column">
      <FormLabel
        htmlFor="search-input"
        sx={{ position: 'relative', marginBottom: -1.5, fontSize: 12 }}
      >
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
          position: 'relative',
          marginBottom: 2,
          minWidth: '20em',
        }}
      />
      {!isSearchEmpty && (
        <IconButton
          onClick={handleClearSearch}
          sx={{ position: 'absolute', top: '0.85em', right: 0 }}
        >
          <Clear sx={{ fontSize: 18 }} />
        </IconButton>
      )}
    </Box>
  </FormControl>
)
