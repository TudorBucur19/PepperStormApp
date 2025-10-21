import { FC } from "react";
import { Box, Typography } from "@mui/material";

import { IRecipeMethod } from "src/interfaces/components";
import { styles } from "src/components/styles/RecipeMethod.styles";

const RecipeMethod: FC<IRecipeMethod> = ({ prepSteps }) => {
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
