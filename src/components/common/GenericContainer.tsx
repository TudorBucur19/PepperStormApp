import Box from "@mui/material/Box";

import { IGenericContainer } from "src/types/components";

import { genericContainerStyles as styles } from "../styles/commonComponents.styles";

const GenericContainer = ({ children }: IGenericContainer) => {
  return <Box sx={styles.container}>{children}</Box>;
};

export default GenericContainer;
