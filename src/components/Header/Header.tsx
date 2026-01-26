import Box from "@mui/material/Box";

import SearchInput from "src/components/common/SearchInput";
import ResponsiveAppBar from "src/components/Header/ResponsiveAppBar";

import { headerStyles as styles } from "src/components/styles/header.styles";

const Header = () => {
  return (
    <Box sx={styles.container}>
      <ResponsiveAppBar />
      <SearchInput />
    </Box>
  );
};

export default Header;
