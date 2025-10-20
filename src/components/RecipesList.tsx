import { FC } from "react";
import Box from "@mui/material/Box";

import PreviewItem from "src/components/PreviewItem";
import { IRecipesList } from "src/interfaces/components";

import { styles } from "./styles/RecipesList.styles";

const RecipesList: FC<IRecipesList> = ({ allRecipes }) => {
  const { recipesContainer } = styles;
  return (
    <Box sx={recipesContainer}>
      {allRecipes &&
        allRecipes.map((recipe) => (
          <PreviewItem key={recipe.id} recipe={recipe} />
        ))}
    </Box>
  );
};

export default RecipesList;
