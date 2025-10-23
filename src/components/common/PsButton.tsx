import { FC } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import CircularProgress from "@mui/material/CircularProgress";
import { SxProps, Theme, useTheme } from "@mui/material";

import { IPsButton } from "src/interfaces/components";
import { styles } from "src/components/styles/PsButton.styles";

const PsButton: FC<IPsButton> = ({ children, onClick }) => {
  const theme = useTheme();
  return <ButtonBase onClick={onClick}>{children}</ButtonBase>;
};

export default PsButton;
