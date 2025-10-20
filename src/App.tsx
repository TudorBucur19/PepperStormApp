import { useEffect } from "react";
import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { IApp } from "src/interfaces/general";
import { useStore } from "src/store/rootStore";

import "./App.css";
import AppRoutes from "src/pages/AppRoutes";

function App({ toggleMode, mode }: IApp) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const checkMobile = useStore((state) => state.checkMobile);

  useEffect(() => {
    checkMobile(isMobile);
  }, [isMobile, checkMobile]);

  {
    /* <Button onClick={toggleMode}>Toggle mode</Button> */
  }
  return <AppRoutes />;
}

export default App;
