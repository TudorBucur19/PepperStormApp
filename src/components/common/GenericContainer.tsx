import { FC } from "react";
import Box from "@mui/material/Box";

import { IGenericContainer } from "src/interfaces/components";

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },
};

const GenericContainer: FC<IGenericContainer> = ({ children }) => {
  return <Box sx={styles.container}>{children}</Box>;
};

export default GenericContainer;
