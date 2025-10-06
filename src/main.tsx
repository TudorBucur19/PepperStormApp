import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { buildTheme } from "src/theme/theme.ts";
import { AppThemeMode } from "src/interfaces/general.ts";

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
      <App toggleMode={toggleMode} mode={mode} />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
