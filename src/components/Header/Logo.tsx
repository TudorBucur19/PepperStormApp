import { FC } from "react";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";

import { ILogo } from "src/types/components";

const styles = {
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  logo: {
    width: "5rem",
    height: "auto",
    cursor: "pointer",
  },
  logoText: {
    fontSize: "1.5rem",
  },
};

const Logo: FC<ILogo> = ({ closeRecipe }) => {
  const { logoContainer, logo, logoText } = styles;
  return (
    <Box sx={logoContainer}>
      <ImageListItem onClick={closeRecipe} sx={logo}>
        <img src="/assets/cat_logo_black.svg" alt="Cat logo" />
      </ImageListItem>
      <Typography sx={logoText}>pepperstorm</Typography>
    </Box>
  );
};

export default Logo;
