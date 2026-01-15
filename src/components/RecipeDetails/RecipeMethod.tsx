import { Box, Typography } from "@mui/material";

import { IRecipeMethod } from "src/types/components";

import { recipeMethodStyles as styles } from "../styles/recipeDetails.styles";

const RecipeMethod = ({ prepSteps }: IRecipeMethod) => {
  const { container, titleText, methodText } = styles;
  return (
    <Box sx={container}>
      <Typography variant="h6" component="h2" sx={titleText}>
        Mod de preparare
      </Typography>
      <Typography sx={methodText}>{prepSteps}</Typography>
    </Box>
  );
};

export default RecipeMethod;
