import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";

import Logo from "src/components/Header/Logo";

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: "fit-content",
    padding: "1rem 2rem",
    width: "100%",
    boxSizing: "border-box",
  },
};

const Header = () => {
  const { container } = styles;
  return (
    <Box sx={container}>
      <Logo />
      <Avatar sx={{ bgcolor: "red" }} alt="Tudor Bucur" src="/broken-image.jpg">
        TB
      </Avatar>
    </Box>
  );
};

export default Header;
