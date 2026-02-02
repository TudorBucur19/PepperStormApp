import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box, Container } from "@mui/material";

import noPhotoPlaceholder from "src/assets/noPhotoPlaceholder.png";
import IngredientsList from "src/components/RecipeDetails/IngredientsList";
import RecipeHeader from "src/components/RecipeDetails/RecipeHeader";
import RecipeMethod from "src/components/RecipeDetails/RecipeMethod";
import ImageCarousel from "src/components/common/ImageCarousel";
import useDatabase from "src/hooks/useDatabase";
import { RECIPES_COLLECTION_NAME } from "src/constants/appConfigValues";
import LoadingPlaceholder from "src/components/common/LoadingPlaceholder";
import ErrorFallback from "src/components/common/ErrorFallback";
import { IDbRecipe } from "src/types/recipes";

import { recipeDisplayStyles as styles } from "src/components/styles/recipeDetails.styles";
// import { useStore } from "src/store/rootStore";

const DisplayRecipe = () => {
  const { getRecipeById } = useDatabase(RECIPES_COLLECTION_NAME);
  const { id } = useParams();
  const [displayedRecipe, setDisplayedRecipe] = useState<IDbRecipe | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const displayedRecipe = useStore((s) => s.displayedRecipe);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);
      try {
        const recipe = await getRecipeById(id || "");
        setDisplayedRecipe(recipe);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Eroare la încărcarea rețetei.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, []);

  if (loading) return <LoadingPlaceholder />;
  if (error) return <ErrorFallback errorMessage={error} />;
  if (!displayedRecipe)
    return <ErrorFallback errorMessage="Rețeta nu a fost găsită." />;

  const {
    imageURL = [],
    title = "",
    preparationTime = "",
    specialTag = [],
    servings = 0,
    category = "",
    prepSteps = "",
    recipeIngredients = [],
    author = { displayName: "", photoURL: "", userID: "" },
    spices = "",
    complexity = "medium",
  } = displayedRecipe?.recipe ?? {};

  const {
    halfPageContainer,
    topContainer,
    bottomContainer,
    detailsBox,
    methodBox,
    ingredientsBox,
    imageBox,
  } = styles;

  return (
    <Container>
      <Box sx={{ ...halfPageContainer, ...topContainer }}>
        {imageURL.length > 1 ? (
          <ImageCarousel images={imageURL} />
        ) : (
          <Box
            component="img"
            src={imageURL.length ? imageURL[0].url : noPhotoPlaceholder}
            alt=""
            sx={imageBox}
          />
        )}

        <Box sx={detailsBox}>
          <RecipeHeader
            {...{
              title,
              preparationTime,
              servings,
              category,
              specialTag,
              owner: author,
              complexity,
              documentId: displayedRecipe?.id || "",
            }}
          />
        </Box>
      </Box>
      <Box sx={{ ...halfPageContainer, ...bottomContainer }}>
        <Box sx={ingredientsBox}>
          <IngredientsList ingredients={recipeIngredients} />
        </Box>
        <Box sx={methodBox}>
          <RecipeMethod {...{ prepSteps, spices }} />
        </Box>
      </Box>
    </Container>
  );
};

export default DisplayRecipe;
