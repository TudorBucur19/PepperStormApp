import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { registerSW } from "virtual:pwa-register";

import App from "./App.tsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { buildTheme } from "src/theme/theme.ts";
import { AppThemeMode } from "src/types/general.ts";
import { AuthProvider } from "src/hooks/AuthContext.tsx";

import "./index.css";

registerSW({ immediate: true });
const Root = () => {
  const [mode] = useState<AppThemeMode>("light");
  // const [mode] = React.useState<AppThemeMode>(
  //   (localStorage.getItem("mode") as AppThemeMode) ||
  //     (window.matchMedia("(prefers-color-scheme: dark)").matches
  //       ? "dark"
  //       : "light"),
  // );
  const theme = React.useMemo(() => buildTheme(mode), [mode]);

  // const toggleMode = () => {
  //   const next = mode === "light" ? "dark" : "light";
  //   localStorage.setItem("mode", next);
  //   setMode(next);
  // };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
