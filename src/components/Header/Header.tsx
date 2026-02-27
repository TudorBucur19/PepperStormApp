import Box from "@mui/material/Box";
import { useLocation } from "react-router";

import SearchInput from "src/components/common/SearchInput";
import ResponsiveAppBar from "src/components/Header/ResponsiveAppBar";
import { URLS } from "src/constants/urls";

import { headerStyles as styles } from "src/components/styles/header.styles";

const Header = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === URLS.HOME;

  return (
    <Box sx={styles.container}>
      <ResponsiveAppBar />
      {isHomePage && <SearchInput />}
    </Box>
  );
};

export default Header;
