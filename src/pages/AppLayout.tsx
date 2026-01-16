import { Outlet } from "react-router";
import Box from "@mui/material/Box";

import ResponsiveAppBar from "src/components/Header/AppBar";

const AppLayout = () => {
  return (
    <Box>
      <ResponsiveAppBar />
      <Outlet />
    </Box>
  );
};

export default AppLayout;
