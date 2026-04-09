import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { useStore } from "src/store/rootStore";
import AppRoutes from "src/pages/AppRoutes";

import "./App.css";

const queryClient = new QueryClient();

// function App({ toggleMode, mode }: IApp) {
function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const checkMobile = useStore((state) => state.checkMobile);

  useEffect(() => {
    checkMobile(isMobile);
  }, [isMobile, checkMobile]);

  {
    /* <Button onClick={toggleMode}>Toggle mode</Button> */
  }
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App;
