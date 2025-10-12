import { FC } from "react";
import Box from "@mui/material/Box";

import PreviewItem from "src/components/PreviewItem";
import { IRecipesList } from "src/interfaces/components";

const styles = {
  recipesContainer: {
    display: "grid",
    maxWidth: "1200px",
    gridTemplateColumns: {
      xs: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
      lg: "repeat(4, 1fr)",
    },
    gap: { xs: "1.2rem", sm: "1.6rem", md: "2rem" },
    padding: "1rem",
  },
};

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
