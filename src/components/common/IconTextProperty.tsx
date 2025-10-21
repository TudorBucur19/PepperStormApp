import { Box, Typography } from "@mui/material";

const IconTextProperty = ({ icon, text }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      {icon}
      <Typography>{text}</Typography>
    </Box>
  );
};

export default IconTextProperty;
