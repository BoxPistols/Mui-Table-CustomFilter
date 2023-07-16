import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

// Mui Eomotion Cache設定
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

// Mui Theme設定
import { ThemeProvider } from '@mui/material/styles'
import theme from './lib/theme'
import { CssBaseline } from '@mui/material'
const cache = createCache({ key: 'css', prepend: true })
cache.compat = true

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
    ,
  </React.StrictMode>,
)
