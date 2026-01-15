import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "./App.tsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { buildTheme } from "src/theme/theme.ts";
import { AppThemeMode } from "src/types/general.ts";

import "./index.css";

const Root = () => {
  const [mode, setMode] = React.useState<AppThemeMode>(
    (localStorage.getItem("mode") as AppThemeMode) ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );
  const theme = React.useMemo(() => buildTheme(mode), [mode]);

  const toggleMode = () => {
    const next = mode === "light" ? "dark" : "light";
    localStorage.setItem("mode", next);
    setMode(next);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App toggleMode={toggleMode} mode={mode} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
