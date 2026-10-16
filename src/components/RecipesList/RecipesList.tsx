import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import PreviewItem from "src/components/RecipesList/PreviewItem";
import RecipeFilters from "src/components/RecipesList/RecipeFilters";
import useRecipesDatabase from "src/hooks/useRecipesDatabase";
import LoadingPlaceholder from "src/components/common/LoadingPlaceholder";
import { IDbRecipe } from "src/types/recipes";
import ErrorFallback from "src/components/common/ErrorFallback";
import { QUERY_KEYS } from "src/constants/appConfigValues";
import { useStore } from "src/store/rootStore";
import { RecipeFiltersState } from "src/types/components";
import { emptyRecipesFilters } from "src/constants/formsValues";
// import { Pagination, Stack } from "@mui/material";

import { recipesListStyles as styles } from "src/components/styles/RecipesList.styles";
import { filterRecipes, getRecipeTags } from "src/utils/helpers";

const RecipesList = () => {
  const { recipesContainer, filterToolbar, emptyState } = styles;
  const { getRecipesCollectionData } = useRecipesDatabase();
  const appSettings = useStore((state) => state.appSettings);
  const [filters, setFilters] =
    useState<RecipeFiltersState>(emptyRecipesFilters);

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
    (recipe) => recipe.recipe.author.userID !== "UcrmOYwtisWpjKYqVrkFWxPBWwg2",
  );

  const categories = useMemo(
    () =>
      Array.from(
        new Set([
          ...appSettings.categories,
          ...allRecipes.map(({ recipe }) => recipe.category),
        ]),
      ).filter(Boolean),
    [allRecipes, appSettings.categories],
  );
  const authors = useMemo(
    () =>
      Array.from(
        new Map(
          allRecipes.map(({ recipe }) => [recipe.author.userID, recipe.author]),
        ).values(),
      )
        .filter((author) => author.userID)
        .sort((first, second) =>
          first.displayName.localeCompare(second.displayName),
        )
        .map((author) => ({ id: author.userID, name: author.displayName })),
    [allRecipes],
  );
  const specialTags = useMemo(() => {
    const uniqueTags = new Map<string, string>();
    const tags = [
      ...appSettings.specialTags,
      ...allRecipes.flatMap(({ recipe }) => getRecipeTags(recipe.specialTag)),
    ];

    tags.forEach((tag) => {
      const displayTag = tag.trim();
      const normalizedTag = displayTag.toLowerCase();
      if (normalizedTag && !uniqueTags.has(normalizedTag)) {
        uniqueTags.set(normalizedTag, displayTag);
      }
    });

    return Array.from(uniqueTags.values());
  }, [allRecipes, appSettings.specialTags]);
  const filteredRecipes = filterRecipes(allRecipes, filters);
  const hasActiveFilters =
    Boolean(filters.category) ||
    Boolean(filters.authorId) ||
    filters.specialTags.length > 0;

  if (isLoading) return <LoadingPlaceholder />;
  if (isError) return <ErrorFallback errorMessage="Error fetching recipes" />;

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" sx={filterToolbar}>
        {hasActiveFilters && (
          <Button
            variant="outlined"
            onClick={() => setFilters(emptyRecipesFilters)}
          >
            Șterge filtrele
          </Button>
        )}
        <RecipeFilters
          value={filters}
          categories={categories}
          authors={authors}
          specialTags={specialTags}
          onApply={setFilters}
        />
      </Stack>
      <Box sx={recipesContainer}>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <PreviewItem key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <Stack sx={emptyState}>
            <Typography variant="h6">
              Nu există rețete pentru filtrele selectate.
            </Typography>
            {hasActiveFilters && (
              <Button
                type="button"
                variant="outlined"
                onClick={() =>
                  setFilters({ category: "", authorId: "", specialTags: [] })
                }
              >
                Șterge filtrele
              </Button>
            )}
          </Stack>
        )}
      </Box>
      {/* <Stack spacing={2}>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack> */}
    </>
  );
};

export default RecipesList;
