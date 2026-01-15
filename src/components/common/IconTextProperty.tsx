import { Box, Typography } from "@mui/material";

import { IIconTextProperty } from "src/types/components";

const IconTextProperty = ({ icon, text }: IIconTextProperty) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      {icon}
      <Typography>{text}</Typography>
    </Box>
  );
};

export default IconTextProperty;
