import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";

import { ICatLogo } from "src/types/components";
import { CatLogoIcon } from "src/components/icons/CatLogoIcon";

import { catLogoStyles as styles } from "src/components/styles/header.styles";

const CatLogo = ({ onClick }: ICatLogo) => {
  const { logoContainer, logo, logoText } = styles;
  return (
    <Box sx={logoContainer} onClick={onClick}>
      <ImageListItem sx={logo}>
        <CatLogoIcon />
      </ImageListItem>
      <Typography sx={logoText}>pepperstorm</Typography>
    </Box>
  );
};

export default CatLogo;
