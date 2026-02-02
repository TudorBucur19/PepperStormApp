import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { IIconTextProperty } from "src/types/components";

import { iconsTextPropertyStyles as styles } from "src/components/styles/commonComponents.styles";

const IconTextProperty = ({
  icon,
  text,
  textStyle = styles.text,
}: IIconTextProperty) => {
  return (
    <Box sx={styles.container}>
      {icon}
      <Typography sx={textStyle}>{text}</Typography>
    </Box>
  );
};

export default IconTextProperty;
