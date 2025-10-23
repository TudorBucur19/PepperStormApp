import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { IIngredientsList } from "src/interfaces/components";
import { IIngredient } from "src/interfaces/recipes";
import { styles } from "src/components/styles/IngredientsList.styles";
import IngredientItem from "src/components/common/IngredientItem";

const IngredientsList: FC<IIngredientsList> = ({ ingredients }) => {
  const { container, listContainer, titleText } = styles;
  return (
    <Box sx={container}>
      <Typography sx={titleText}>Ingrediente</Typography>
      <Box sx={listContainer}>
        {ingredients.map((item: IIngredient, index: number) => (
          <IngredientItem
            key={`${item.ingredient}-${index}`}
            ingredient={item}
            isLast={index === ingredients.length - 1}
          />
        ))}
      </Box>
    </Box>
  );
};

export default IngredientsList;
