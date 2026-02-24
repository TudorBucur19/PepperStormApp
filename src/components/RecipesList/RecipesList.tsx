import { FC } from "react";
import Box from "@mui/material/Box";

import PreviewItem from "src/components/RecipesList/PreviewItem";
import { IRecipesList } from "src/types/components";

import { recipesListStyles as styles } from "src/components/styles/recipesList.styles";
// import { Pagination, Stack } from "@mui/material";

const RecipesList: FC<IRecipesList> = ({ allRecipes }) => {
  const { recipesContainer } = styles;

  return (
    <>
      <Box sx={recipesContainer}>
        {allRecipes &&
          allRecipes.map((recipe) => (
            <PreviewItem key={recipe.id} recipe={recipe} />
          ))}
      </Box>
      {/* <Stack spacing={2}>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack> */}
    </>
  );
};

export default RecipesList;
