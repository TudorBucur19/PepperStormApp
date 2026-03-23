import { Box, Typography } from "@mui/material";

import { IRecipeMethod } from "src/types/components";

import { recipeMethodStyles as styles } from "../styles/recipeDetails.styles";

const RecipeMethod = ({ prepSteps, spices }: IRecipeMethod) => {
  const { container, titleText, methodText, spicesText, methodContainer } =
    styles;
  const spicesList = spices.split(/,+/);

  return (
    <Box sx={container}>
      <Typography variant="h6" component="h2" sx={titleText}>
        Mod de preparare
      </Typography>
      <Box sx={methodContainer}>
        {spices && (
          <Typography variant="subtitle1" component="h3" sx={spicesText}>
            {`Condimente: ${spicesList.join(", ")}`}
          </Typography>
        )}
        <Typography sx={methodText}>{prepSteps}</Typography>
      </Box>
    </Box>
  );
};

export default RecipeMethod;
