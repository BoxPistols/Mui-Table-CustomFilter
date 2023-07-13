import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Mui Theme設定
import { ThemeProvider } from '@mui/material/styles';
import theme from "./lib/theme"
import { CssBaseline } from '@mui/material';

// Eomotion Cacheとは https://emotion.sh/docs/@emotion/cache にあるように、CSSのキャッシュを行うもの
// これを使うことで、CSSのキャッシュを行うことができ、パフォーマンスが向上する
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'em', prepend: true, stylisPlugins: []
});
cache.compat = true;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>,
  </React.StrictMode>
);

