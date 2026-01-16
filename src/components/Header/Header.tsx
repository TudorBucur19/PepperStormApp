import { useNavigate } from "react-router";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";

import Logo from "src/components/Header/CatLogo";
import SearchInput from "src/components/common/SearchInput";

import { headerStyles as styles } from "src/components/styles/header.styles";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Box sx={styles.container}>
      <Box sx={styles.headerContainer}>
        <Logo onClick={() => navigate("/")} />
        {/* <PsButton
          variant="text"
          color="primary"
          onClick={() => navigate("/adaugareteta")}
        >
          Adauga reteta
        </PsButton> */}
        <Avatar
          sx={{ bgcolor: "red" }}
          alt="Tudor Bucur"
          src="/broken-image.jpg"
        >
          TB
        </Avatar>
      </Box>
      <SearchInput />
    </Box>
  );
};

export default Header;
