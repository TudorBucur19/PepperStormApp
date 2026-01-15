import { Chip } from "@mui/material";

import { IChipInfo } from "src/types/components";

import { chipInfoStyles as styles } from "../styles/commonComponents.styles";

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
