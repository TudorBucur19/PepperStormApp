import { Outlet } from "react-router";
import Box from "@mui/material/Box";

import Header from "src/components/Header/Header";
import FloatingBackButton from "src/components/common/FloatingBackButton";

import { appLayoutStyles as styles } from "src/pages/styles/pages.styles";

const AppLayout = () => {
  return (
    <Box sx={styles.container}>
      <Header />
      <Outlet />
      <FloatingBackButton />
    </Box>
  );
};

export default AppLayout;
