import { useNavigate } from "react-router";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";

import PsButton from "src/components/common/PsButton";

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
  const navigate = useNavigate();

  const { container } = styles;
  return (
    <Box sx={container}>
      <Logo />
      <PsButton
        variant="text"
        color="primary"
        onClick={() => navigate("/adaugareteta")}
      >
        Adauga reteta
      </PsButton>
      <Avatar sx={{ bgcolor: "red" }} alt="Tudor Bucur" src="/broken-image.jpg">
        TB
      </Avatar>
    </Box>
  );
};

export default Header;
