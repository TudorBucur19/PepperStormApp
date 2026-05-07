import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";

import PreviewItem from "src/components/RecipesList/PreviewItem";
import useRecipesDatabase from "src/hooks/useRecipesDatabase";
import LoadingPlaceholder from "src/components/common/LoadingPlaceholder";
import { IDbRecipe } from "src/types/recipes";
import ErrorFallback from "src/components/common/ErrorFallback";
import { QUERY_KEYS } from "src/constants/appConfigValues";
// import { Pagination, Stack } from "@mui/material";

import { recipesListStyles as styles } from "src/components/styles/recipesList.styles";

const RecipesList = () => {
  const { recipesContainer } = styles;
  const { getRecipesCollectionData } = useRecipesDatabase();

  const {
    // data: allRecipes = [],
    data: fetchedRecipes = [],
    isLoading,
    isError,
  } = useQuery<IDbRecipe[]>({
    queryKey: QUERY_KEYS.ALL_RECIPES_QUERY_KEY,
    queryFn: async () => (await getRecipesCollectionData()) ?? [],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  //temporary filter out the recipes without a cover photo.
  const allRecipes = fetchedRecipes.filter(
    (recipe) => recipe.recipe.author.userID !== "W1fu8umk2OP3joZ1w9Ip3POHnVM2",
  );
  if (isLoading) return <LoadingPlaceholder />;
  if (isError) return <ErrorFallback errorMessage="Error fetching recipes" />;

  return (
    <>
      <Box sx={recipesContainer}>
        {allRecipes.length > 0 &&
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
