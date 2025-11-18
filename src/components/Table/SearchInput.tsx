// filename: SearchInput.tsx
import { forwardRef, ForwardedRef } from 'react'
import { ChangeEvent } from 'react'
import { Box, FormControl, FormLabel, IconButton, TextField } from '@mui/material'
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
      <Box display="flex" flexDirection="column" sx={{ position: 'relative' }}>
        <FormLabel htmlFor="search-input" sx={{ mb: 0.5, fontSize: 12 }}>
          データ検索
        </FormLabel>
        <TextField
          id="search-input"
          value={search}
          onChange={handleSearchChange}
          variant="outlined"
          margin="none"
          size="small"
          inputRef={ref}
          sx={{
            mb: 1,
            minWidth: '24em',
          }}
        />
        {!isSearchEmpty && (
          <IconButton
            onClick={handleClearSearch}
            sx={{ position: 'absolute', top: 26, right: 4 }}
            size="small"
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
