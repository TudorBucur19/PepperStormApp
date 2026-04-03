import { PsButtonColor } from "src/types/components";
import { Theme } from "@mui/material/styles";

//the colors will be uptadet after the general theme will be developed
const colors = (theme: Theme) => ({
  transparent: {
    background: "transparent",
    label: theme.palette.primary.main,
    hover: theme.palette.primary.contrastText,
    disabledBg: "",
    disabledLabel: "#1F1E1F",
  },
  primary: {
    background: theme.palette.primary.main,
    label: theme.palette.primary.contrastText,
    hover: theme.palette.primary.light,
    disabledBg: "#E1DBDF",
    disabledLabel: "#737373",
  },
  secondary: {
    background: theme.palette.secondary.main,
    label: theme.palette.primary.light,
    hover: "#536E42",
    disabledBg: "#E1DBDF",
    disabledLabel: "#737373",
  },
  danger: {
    background: theme.palette.error.main,
    label: theme.palette.error.contrastText,
    hover: theme.palette.error.light,
    disabledBg: "#E1DBDF",
    disabledLabel: "#737373",
  },
});
export const psButtonStyles = (
  color: PsButtonColor,
  isLoading: boolean,
  theme: Theme,
  disabled: boolean,
  fullWidth: boolean,
  fitContentWidth: boolean,
) => ({
  colors: colors(theme),
  buttonBase: {
    display: "flex",
    gap: "0.5rem",
    width: fullWidth ? "100%" : "fit-content",
    padding: fitContentWidth ? 0 : "0.6rem",
    borderRadius: "0.25rem",
    maxHeight: "3.5rem",
    fontSize: "1.125rem",
    lineHeight: "1.625rem",
    fontWeight: "bold",
    color: disabled ? "#737373" : colors(theme)[color].label,
    backgroundColor: disabled
      ? colors(theme)[color].disabledBg
      : colors(theme)[color].background,
    pointerEvents: isLoading || disabled ? "none" : "auto",
    cursor: isLoading || disabled ? "not-allowed" : "pointer",
    "&:hover": {
      backgroundColor: colors(theme)[color].hover,
    },
  },
  text: {
    padding: 0,
    backgroundColor: "transparent",
    color: disabled
      ? colors(theme)[color].disabledLabel
      : colors(theme)[color].label,
    "&:hover": {
      backgroundColor: "transparent",
      scale: "1.05",
    },
  },
  contained: {},
  outlined: {
    border: "2px solid " + colors(theme)[color].label,
    "&:hover": {
      scale: "1.05",
    },
  },
  basic: {
    padding: "0.5rem",
    border: "none",
    "&:hover": {
      scale: "1.2",
    },
  },
  progressIcon: {
    color: colors(theme)[color].label,
    marginRight: "0.25rem",
    marginLeft: "0.25rem",
  },
});
