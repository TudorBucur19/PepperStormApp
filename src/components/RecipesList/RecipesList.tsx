import { useEffect } from "react";
import Box from "@mui/material/Box";

import PreviewItem from "src/components/RecipesList/PreviewItem";

import { recipesListStyles as styles } from "src/components/styles/recipesList.styles";
import useRecipesDatabase from "src/hooks/useRecipesDatabase";
import { useStore } from "src/store/rootStore";
import LoadingPlaceholder from "src/components/common/LoadingPlaceholder";
// import { Pagination, Stack } from "@mui/material";

const RecipesList = () => {
  const { recipesContainer } = styles;
  const { getRecipesCollectionData } = useRecipesDatabase();
  const allRecipes = useStore((state) => state.recipes);
  const isLoading = useStore((state) => state.apiCallStatus.isLoading);
  const setApiCallStatus = useStore((state) => state.setApiCallStatus);

  useEffect(() => {
    const fetchRecipes = async () => {
      setApiCallStatus(true);
      await getRecipesCollectionData();
      setApiCallStatus(false);
    };
    fetchRecipes();
  }, []);

  if (isLoading) return <LoadingPlaceholder />;

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
