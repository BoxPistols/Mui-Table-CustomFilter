// filename: SearchInput.tsx
import { forwardRef, ForwardedRef } from 'react'
import { ChangeEvent } from 'react'
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

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      search,
      handleSearchChange,
      handleClearSearch,
      isSearchEmpty,
    }: SearchInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => (
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
          inputRef={ref}
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
  ),
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
