import { Chip } from "@mui/material";

interface IChipInfo {
  label: string;
  variant: "filled" | "outlined";
  color: "primary" | "secondary" | "error" | "success" | "info" | "warning";
  useCase: "specialTag" | "category" | "cardTop";
}

const styles = {
  cardChip: {
    borderRadius: "8px",
    border: "none",
    textTransform: "uppercase",
  },
  recipeCategory: {
    border: "none",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "500",
  },
  cardTop: {
    position: "absolute",
    top: 0,
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    border: "none",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "500",
  },
};
const ChipInfo = ({ label, variant, color, useCase }: IChipInfo) => {
  const { cardChip, recipeCategory, cardTop } = styles;
  return (
    <Chip
      label={label}
      variant={variant}
      sx={{
        ...cardChip,
        ...(useCase === "category" ? recipeCategory : {}),
        ...(useCase === "cardTop" ? cardTop : {}),
      }}
      color={color}
    />
  );
};

export default ChipInfo;
