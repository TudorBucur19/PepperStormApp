import { Box, Container } from "@mui/material";

import { useStore } from "src/store/rootStore";
import noPhotoPlaceholder from "src/assets/noPhotoPlaceholder.png";
import IngredientsList from "src/components/RecipeDetails/IngredientsList";
import RecipeHeader from "src/components/RecipeDetails/RecipeHeader";
import RecipeMethod from "src/components/RecipeDetails/RecipeMethod";

import { recipeDisplayStyles as styles } from "src/components/styles/recipeDetails.styles";

const DisplayRecipe = () => {
  const displayedRecipe = useStore((state) => state.displayedRecipe);
  const {
    imageURL = [],
    title = "",
    preparationTime = "",
    specialTag = [],
    servings = 0,
    category = "",
    prepSteps = "",
    recipeIngredients = [],
  } = displayedRecipe?.recipe ?? {};

  const {
    halfPageContainer,
    topContainer,
    bottomContainer,
    imageBox,
    detailsBox,
    methodBox,
    ingredientsBox,
  } = styles;

  return (
    <Container>
      <Box sx={{ ...halfPageContainer, ...topContainer }}>
        <Box
          component="img"
          src={imageURL[0]?.url || noPhotoPlaceholder}
          alt="imagine coperta reteta"
          sx={imageBox}
        />
        <Box sx={detailsBox}>
          <RecipeHeader
            {...{
              title,
              preparationTime,
              servings,
              category,
              specialTag,
            }}
          />
        </Box>
      </Box>
      <Box sx={{ ...halfPageContainer, ...bottomContainer }}>
        <Box sx={ingredientsBox}>
          <IngredientsList ingredients={recipeIngredients} />
        </Box>
        <Box sx={methodBox}>
          <RecipeMethod {...{ prepSteps }} />
        </Box>
      </Box>
    </Container>
  );
};

export default DisplayRecipe;
