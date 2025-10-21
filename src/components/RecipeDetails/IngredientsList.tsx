import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { IIngredientsList } from "src/interfaces/components";
import { IIngredient } from "src/interfaces/recipes";
import { styles } from "src/components/styles/IngredientsList.styles";

const IngredientsList: FC<IIngredientsList> = ({ ingredients }) => {
  const { container, listContainer, titleText, listItem, lastListItem } =
    styles;
  return (
    <Box sx={container}>
      <Typography sx={titleText}>Ingrediente</Typography>
      <Box sx={listContainer}>
        {ingredients.map((item: IIngredient, index: number) => (
          <Box
            key={`${item.ingredient}-${index}`}
            sx={
              index === ingredients.length - 1
                ? { ...listItem, ...lastListItem }
                : { ...listItem }
            }
          >
            {item.quantity} {item.measure} {item.ingredient}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default IngredientsList;
