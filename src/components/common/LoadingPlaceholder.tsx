import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { loadingPlaceholderStyles as styles } from "src/components/styles/commonComponents.styles";

const LoadingPlaceholder = () => {
  return (
    <Box sx={styles.container}>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default LoadingPlaceholder;
