import { Outlet } from "react-router";
import Box from "@mui/material/Box";

import Header from "src/components/Header/Header";

const AppLayout = () => {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
};

export default AppLayout;
