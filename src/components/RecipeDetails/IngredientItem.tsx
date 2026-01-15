import { useState } from "react";
import { Box, Checkbox } from "@mui/material";

import { DoneOutlineIcon } from "src/components/icons";
import { IIngredientItem } from "src/types/components";

import { ingredientItemStyles as styles } from "../styles/recipeDetails.styles";

const IngredientItem = ({ ingredient, isLast }: IIngredientItem) => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => setChecked((prev) => !prev);
  const { listItem, lastListItem, checkBox } = styles;
  return (
    <Box
      sx={isLast ? { ...listItem, ...lastListItem } : { ...listItem }}
      onClick={handleToggle}
    >
      {ingredient.quantity} {ingredient.measure} {ingredient.ingredient}
      <Checkbox
        id={`id-${ingredient.ingredient}`}
        checked={checked}
        size="small"
        checkedIcon={<DoneOutlineIcon />}
        color="success"
        sx={checkBox}
      />
    </Box>
  );
};

export default IngredientItem;
