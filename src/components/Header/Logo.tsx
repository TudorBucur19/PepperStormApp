import { FC } from "react";
import { Box, ImageListItem } from "@mui/material";

interface ILogo {
  closeRecipe?: () => void;
}

const styles = {
  logo: {
    width: "5rem",
    height: "auto",
    cursor: "pointer",
  },
};

const Logo: FC<ILogo> = ({ closeRecipe }) => {
  const { logo } = styles;
  return (
    <Box m={0}>
      <ImageListItem onClick={closeRecipe} sx={logo}>
        <img src="/assets/cat_logo_black.svg" alt="Cat logo" />
      </ImageListItem>
    </Box>
  );
};

export default Logo;
