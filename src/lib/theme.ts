// import { Palette } from "@mui/icons-material";
import { Theme, createTheme } from '@mui/material/styles'

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display1: true
    display2: true
    '2xl': true
  }
}

export const breakpoints = {
  values: {
    xs: 0,
    sm: 480,
    md: 768,
    lg: 1280,
    xl: 1536,
    xxl: 1920,
  },
}

// ===== Typography =====

const fontWeight = {
  normal: 400,
  // medium: 500, ミディアムは、ブラウザーによっては正しく表示されないことがあるため、一旦使用しない
  bold: 700,
}
const lineHeight = {
  small: 1.25,
  medium: 1.5,
  large: 1.75,
}

/**
 * なぜこれを使うのか？
 * `md` = 1rem = 16px という抽象化された値を使うことで、アクセシビリティの向上と実装の簡素化を図る
 */

const baseFontSize = 14

// Function to convert px to rem
const pxToRem = (px: number) => `${px / baseFontSize}rem`

const fontSizesVariant = {
  xs: pxToRem(baseFontSize * 0.75), // About 0.75rem = 12px
  sm: pxToRem(baseFontSize * 0.875), // About 0.875rem = 14px
  md: pxToRem(baseFontSize), // 1rem = 14px
  lg: pxToRem(baseFontSize * 1.125), // About 1.125rem = 16px
  xl: pxToRem(baseFontSize * 1.25), // About 1.25rem = 18px
  '2xl': pxToRem(baseFontSize * 1.5), // About 1.5rem = 21px
  '3xl': pxToRem(baseFontSize * 1.875), // About 1.875rem = 24px
}

const heading = {
  fontWeight: fontWeight.bold,
  lineHeight: lineHeight.small,
}

// ===== Theme =====
export const colors = {
  primary: '#2663c4',
  secondary: '#696881',
  success: '#1fab1f',
  info: '#55bfda',
  warning: '#efc417',
  error: '#d73333',
  light: '#f4f4f4',
  dark: '#222222',
  white: '#ffffff',
  transparent: 'transparent',
  body: '#f4f4f4',
  border: '#dddddd',
  muted: '#aaaaaa',
  text: '#2c2c30',
  textMuted: '#888888',
  heading: '#222222',
  headingMuted: '#888888',
  placeholder: '#888888',
  background: '#ffffff',
  surface: '#ffffff',
  disabled: '#dddddd',
  divider: '#dddddd',
  shadow: '#000000',
  black: '#000000',
  grey100: '#f4f4f4',
  grey200: '#dddddd',
  grey300: '#aaaaaa',
  grey400: '#888888',
  grey500: '#666666',
  grey600: '#444444',
  grey700: '#222222',
  grey800: '#111111',
  grey900: '#000000',
  // Action Color
  action: {
    hover: 'rgba(80, 139, 235, 0.3)',
    active: 'rgba(80, 139, 235, 0.3)',
    selected: 'rgba(80, 139, 235, 0.3)',
    focus: 'rgba(80, 139, 235, 0.3)',
    selectedOpacity: 0.16,
    hoverOpacity: 0.08,
    disabled: '#dddddd',
    disabledBackground: '#dddddd',
    disabledOpacity: 0.38,
    focusOpacity: 0.12,
    activatedOpacity: 0.24,
    tableHover: 'rgba(201, 234, 244, 0.15)',
    tableSelected: 'rgba(201, 234, 244, 0.3)',
    tableSelectedOpacity: 0.16,
    tableDisabled: '#dddddd',
  },
}

const theme: Theme = createTheme({
  // ===== BreakPoint =====
  // default: lg
  breakpoints: {
    values: {
      xs: breakpoints.values.xs,
      sm: breakpoints.values.sm,
      md: breakpoints.values.md,
      lg: breakpoints.values.lg,
      xl: breakpoints.values.xl,
    },
  },

  palette: {
    primary: {
      main: colors.primary,
      light: '#6e90c6',
      dark: '#1e4a9c',
    },
    secondary: {
      main: colors.secondary,
      light: colors.secondary,
      dark: colors.secondary,
    },
    success: {
      main: colors.success,
    },
    info: {
      main: colors.info,
    },
    warning: {
      main: colors.warning,
    },
    error: {
      main: colors.error,
    },
    text: {
      primary: colors.text,
      secondary: colors.textMuted,
      disabled: colors.disabled,
    },
    grey: {
      100: colors.grey100,
      200: colors.grey200,
      300: colors.grey300,
      400: colors.grey400,
      500: colors.grey500,
      600: colors.grey600,
      700: colors.grey700,
      800: colors.grey800,
      900: colors.grey900,
    },

    background: {
      default: colors.background,
      paper: colors.surface,
    },
    divider: colors.divider,
    action: {
      // TODO: これらの色を変更する
      // active: colors.primary,
      // hover: colors.primary,
      // selected: colors.primary,
      // focus: colors.primary,
      hoverOpacity: 0.08,
      selectedOpacity: 0.16,
      disabled: colors.disabled,
      disabledBackground: colors.disabled,
      disabledOpacity: 0.38,
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
  },

  // ===== Typography =====

  typography: {
    htmlFontSize: baseFontSize,
    fontSize: baseFontSize,

    allVariants: {
      fontFamily: ' "Inter, Noto Sans JP, Helvetica, Arial, sans-serif" ',
      color: 'rgba(20, 30, 10, 0.8)',
      lineHeight: lineHeight.medium,
      fontWeight: fontWeight.normal,
      textTransform: 'inherit',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'antialiased',
      fontSize: pxToRem(baseFontSize),
    },

    h1: {
      fontSize: fontSizesVariant['2xl'], // 1.5rem
      ...heading,
    },
    h2: {
      fontSize: fontSizesVariant['xl'], // 1.25rem
      ...heading,
    },
    h3: {
      fontSize: fontSizesVariant['lg'], // 1.125rem
      ...heading,
    },
    h4: {
      fontSize: fontSizesVariant.md, // 1rem
      ...heading,
    },
    h5: {
      fontSize: fontSizesVariant.sm, // 0.875rem
      ...heading,
    },
    h6: {
      fontSize: fontSizesVariant.xs, // 0.75rem
      ...heading,
    },
    body1: {
      fontSize: fontSizesVariant.md, // 1rem
      lineHeight: lineHeight.small,
    },
    body2: {
      fontSize: fontSizesVariant.sm, // 0.875rem
      lineHeight: lineHeight.small,
    },
    subtitle1: {
      fontSize: fontSizesVariant.sm, // 0.875rem
      lineHeight: lineHeight.small,
    },
    subtitle2: {
      fontSize: fontSizesVariant.xs, // 0.75rem
      lineHeight: lineHeight.small,
    },
    overline: {
      fontSize: fontSizesVariant.xs, // 0.75rem
      fontWeight: fontWeight.bold,
      lineHeight: lineHeight.small,
      textTransform: 'none',
    },
    caption: {
      fontSize: fontSizesVariant.xs, // 0.75rem
      lineHeight: lineHeight.small,
    },
    button: {
      fontSize: fontSizesVariant.sm, // 0.875rem
      fontWeight: fontWeight.bold,
      lineHeight: lineHeight.medium,
      textTransform: 'none',
    },
  },
  // Component

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.body,
          fontSize: fontSizesVariant.md,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: 'contained', // デフォルトのボタンの種類を設定
        disableElevation: true, // デフォルトの影を削除
      },
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            // disabledの時のスタイル
            color: colors.grey300, // 文字色
          },
        },
      },
    },
    MuiTypography: {
      // defaultProps: {
      //   variant: "body1",
      // },
      styleOverrides: {
        root: {
          // fontSize: 14,
          // fontSize: pxToRem(baseFontSize),
        },
        gutterBottom: {
          marginBottom: '1em',
        },
        paragraph: {
          marginBottom: '1em',
          fontSize: fontSizesVariant.md,
          lineHeight: lineHeight.small,
        },
        // other style overrides
      },

      variants: [
        {
          props: { variant: '2xl' },
          style: {
            fontSize: fontSizesVariant['2xl'],
          },
        },
        {
          props: { variant: 'display1' },
          style: {
            display: 'block',
            fontSize: '2.4rem',
            fontWeight: 700,
            lineHeight: 1.5,
            color: 'tomato',
          },
        },
        {
          props: { variant: 'display2' },
          style: {
            fontSize: '2.2rem',
            fontWeight: 700,
            color: 'tomato',
            lineHeight: 1.5,
          },
        },
      ],
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          height: 44,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 44,
          '@media(min-width:0px)': {
            minHeight: 44,
          },
        },
      },
    },
    // ===== Table Design =====
    // MuiTable: {
    //   styleOverrides: {
    //     root: {},
    //   },
    // },
    // MuiTableContainer: {
    //   styleOverrides: {
    //     root: {
    // boxShadow: "none",
    // borderBottom: "none",
    // border: `2px solid rgba(0, 0, 0, 0.1)`,
    //     },
    //   },
    // },
    // MuiTableHead: {
    //   styleOverrides: {
    //     root: {
    //       borderBottom: `2px solid rgba(0, 0, 0, 0.1)`,
    //       ".MuiTableCell-root": {
    //         backgroundColor: colors.grey200,
    //         fontWeight: fontWeight.bold,
    //         fontSize: fontSizesVariant.sm,
    //         lineHeight: lineHeight.small,
    //         color: colors.grey600,
    //         "&:hover": {
    //           //   backgroundColor: colors.grey300,
    //           cursor: "pointer",
    //         },
    //       },
    //     },
    //   },
    // },
    // MuiTableBody: {
    //   styleOverrides: {
    //     root: {
    //       // borderBottom: "1px solid #e0e0e0",
    //       "& tr:last-child td": {
    //         borderBottom: 0,
    //       },
    //     },
    //   },
    // },
    // MuiTableRow: {
    //   styleOverrides: {
    //     root: {
    //       cursor: "pointer",
    //       transition: "0.3s",
    //       "&:hover": {
    //         // backgroundColor: "rgba(0, 0, 0, 0.08)",
    //         backgroundColor: colors.action.tableHover,
    //       },
    //       "&:last-child td, &:last-child th": {
    //         borderBottom: 0,
    //       },
    //     },
    //   },
    // },
    // // Cell
    // MuiTableCell: {
    //   styleOverrides: {
    //     root: {
    //       padding: 12,
    //       borderBottom: `1px solid rgba(0, 0, 0, 0.1)`,
    //       // border: "none",
    //       cursor: "pointer",
    //       transition: "0.3s",
    //       "&:hover": {
    //         // backgroundColor: "rgba(0, 0, 0, 0.08)",
    //         backgroundColor: colors.action.tableSelected,
    //       },
    //       "&:last-child": {
    //         paddingRight: 24,
    //       },
    //       ".MuiButtonBase-root": {
    //         // TODO: icon color variant
    //         color: colors.primary, // 10% darker,
    //         "&:hover": {
    //           color: colors.secondary,
    //         },
    //         "&.MuiTableSortLabel-root": {
    //           color: colors.secondary,
    //         },
    //       },
    //     },
    //     head: {
    //       fontWeight: fontWeight.bold,
    //     },
    //   },
    // },
    // MuiTableFooter: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: colors.grey100,
    //     },
    //   },
    // },
    // MuiTablePagination: {
    //   styleOverrides: {
    //     root: {
    //       borderTop: "1px solid #e0e0e0",
    //     },
    //   },
    // },
    // MuiTableSortLabel: {
    //   styleOverrides: {
    //     root: {
    //       "&:hover": {
    //         color: colors.primary,
    //       },
    //       "&.MuiTableSortLabel-active": {
    //         color: colors.primary,
    //       },
    //     },
    //   },
    // },
    // ===== Paper =====
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '4px 8px 12px 0 rgba(0, 0, 0, 0.1)',
          // backgroundColor: colors.white,
          // border: "1px solid #e0e0e0",
          // borderRadius: 4,
          // boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.1)",
          // padding: "0 16px",
        },
      },
    },
  },
  // ===== Mixins =====
  mixins: {
    toolbar: {
      minHeight: 44,
    },
  },
  // ===== Shape =====
  shape: {
    borderRadius: 4,
  },
  // ===== Spacing =====
  spacing: 8,
  // ===== Transitions =====
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  // ===== Z-Index =====
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
})

export default theme
