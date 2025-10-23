import { PsButtonColor } from "src/interfaces/components";
import { Theme } from "@mui/material/styles";

//the colors will be uptadet after the general theme will be developed
const colors = (theme: Theme) => ({
  transparent: {
    background: "transparent",
    label: "#1F1E1F",
    hover: "#F5F5F5",
    disabledBg: "",
    disabledLabel: "#1F1E1F",
  },
  primary: {
    background: theme.palette.primary.main,
    label: theme.palette.primary.light,
    hover: "#620032",
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
  secondaryDark: {
    background: "#3F582D",
    label: "#FFFFFF",
    hover: "#2D3E20  ",
    disabledBg: "#E1DBDF",
    disabledLabel: "#737373",
  },
  secondaryLight: {
    background: "#647E4E",
    label: "#FFFFFF",
    hover: "#536E42",
    disabledBg: "#E1DBDF",
    disabledLabel: "#737373",
  },
  secondaryWhite: {
    background: "#FFFFFF",
    label: "#1F1E1F",
    hover: "#F5F5F5",
    disabledBg: "",
    disabledLabel: "",
  },
  black: {
    background: "#000000",
    label: "#FFFFFF",
    hover: "#000000",
    disabledBg: "#E1DBDF",
    disabledLabel: "#737373",
  },
  transparentBlack: {
    background: "transparent",
    label: theme.palette.primary.dark,
    hover: "#F5F5F5",
    disabledBg: "#E1DBDF",
    disabledLabel: "#737373",
  },
});

export const styles = (
  color: PsButtonColor,
  isLoading: boolean,
  theme: Theme,
  disabled: boolean
) => ({
  colors: colors(theme),
  buttonBase: {
    display: "flex",
    gap: "0.5rem",
    width: "fit-content",
    padding: "1.25rem 1.5rem 1.25rem 1rem",
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
  text: {},
  contained: {},
  outlined: {
    border: "1px solid #737373CC",
  },
  progressIcon: {
    color: colors(theme)[color].label,
    marginRight: "0.25rem",
    marginLeft: "0.25rem",
  },
});
