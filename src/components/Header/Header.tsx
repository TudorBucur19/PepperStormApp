import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Logo from "src/components/Header/Logo";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    maxHeight: "3rem",
  },
};

const Header = () => {
  const { container } = styles;
  return (
    <Box sx={container}>
      <Logo />
      <Typography>pepperstorm</Typography>
    </Box>
  );
};

export default Header;
