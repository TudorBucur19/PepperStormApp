import ButtonBase from "@mui/material/ButtonBase";
import CircularProgress from "@mui/material/CircularProgress";
import { SxProps, Theme, useTheme } from "@mui/material";

import { IPsButton } from "src/types/components";

import { psButtonStyles as styles } from "src/components/styles/PsButton.styles";

const PsButton = ({
  children,
  onClick,
  variant = "contained",
  color = "secondaryLight",
  fullWidth = false,
  fitContentWidth = false,
  disabled = false,
  identifierId = undefined,
  isLoading = false,
  ariaLabel,
  startIcon,
  endIcon,
  type = "button",
  className = "",
  sx,
  size = "medium",
  testId,
}: IPsButton) => {
  const theme = useTheme();
  const allStyles = styles(color, isLoading, theme, disabled);
  const { buttonBase, progressIcon } = allStyles;

  return (
    <ButtonBase
      sx={
        [
          buttonBase,
          allStyles.colors[color][variant],
          allStyles[variant],
          sx,
        ].filter(Boolean) as SxProps<Theme>
      }
      onClick={onClick}
      id={identifierId}
      disabled={disabled}
      aria-label={ariaLabel}
      className={className}
      type={type}
    >
      {isLoading && startIcon ? (
        <CircularProgress size={"1rem"} sx={progressIcon} />
      ) : (
        startIcon
      )}
      {isLoading && !startIcon && !endIcon && (
        <CircularProgress size={"1rem"} sx={progressIcon} />
      )}
      {children}
      {isLoading && endIcon ? (
        <CircularProgress size={"1rem"} sx={progressIcon} />
      ) : (
        endIcon
      )}
    </ButtonBase>
  );
};

export default PsButton;
