import { Outlet } from "react-router";
import Box from "@mui/material/Box";

import Header from "src/components/Header/Header";

import { appLayoutStyles as styles } from "src/pages/styles/pages.styles";

const AppLayout = () => {
  return (
    <Box sx={styles.container}>
      <Header />
      <Outlet />
    </Box>
  );
};

export default AppLayout;
