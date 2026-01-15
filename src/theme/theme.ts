import { createTheme, ThemeOptions } from "@mui/material/styles";
import { AppThemeMode } from "src/types/general";

const baseTokens = {
  brandMain: "#337179", // customize
  brandContrast: "#ffffff",
  radius: 12, // global rounding
};

const lightPalette: ThemeOptions["palette"] = {
  mode: "light",
  primary: {
    main: baseTokens.brandMain,
    light: "#337179D9",
    contrastText: "#F2F3F4",
  },
  secondary: { main: "#2effcb" },
  background: { default: "#f1eaea", paper: "#fff" },
};

const darkPalette: ThemeOptions["palette"] = {
  mode: "dark",
  primary: { main: baseTokens.brandMain },
  secondary: { main: "#ce93d8" },
  background: { default: "#0b0b0b", paper: "#121212" },
};

export const buildTheme = (mode: AppThemeMode = "light") =>
  createTheme({
    palette: mode === "light" ? lightPalette : darkPalette,
    typography: {
      fontFamily: `"Roboto", system-ui, -apple-system, Segoe UI, Arial`,
      h1: { fontWeight: 700, letterSpacing: -0.5 },
      h2: { fontWeight: 700, letterSpacing: -0.25 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    spacing: 8,
    shape: { borderRadius: baseTokens.radius },
    components: {
      MuiButton: {
        defaultProps: { variant: "contained" },
        styleOverrides: {
          root: { borderRadius: baseTokens.radius },
          containedPrimary: { color: baseTokens.brandContrast },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 1 },
        styleOverrides: { rounded: { borderRadius: baseTokens.radius } },
      },
    },
  });
