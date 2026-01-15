import { Box, Typography } from "@mui/material";

import { IIngredientsList } from "src/types/components";
import { IIngredient } from "src/types/recipes";
import IngredientItem from "src/components/RecipeDetails/IngredientItem";

import { ingredientsListStyles as styles } from "../styles/recipeDetails.styles";

const IngredientsList = ({ ingredients }: IIngredientsList) => {
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
