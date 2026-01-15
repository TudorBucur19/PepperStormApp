import * as React from "react";
import { useNavigate } from "react-router";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AccessTimeIcon } from "src/components/icons";
import noPhotoPlaceholder from "src/assets/noPhotoPlaceholder.png";
import { IPreviewItem } from "src/types/components";
import { formatMinutesRo } from "src/utils/uiFunctions";
import { useStore } from "src/store/rootStore";

import { previewItemStyles as styles } from "src/components/styles/recipesList.styles";

const RecipeCard: React.FC<IPreviewItem> = ({ recipe }) => {
  const navigate = useNavigate();
  const setDisplayedRecipe = useStore((s) => s.setDisplayedRecipe);

  const handleClick = () => {
    setDisplayedRecipe(recipe);
    navigate(`retete/${recipe.id}`);
  };
  const { imageURL, title, preparationTime, specialTag, category } =
    recipe.recipe;
  const {
    previewItemContainer,
    cardImageContainer,
    recipeCategory,
    cardMedia,
    recipeTitle,
    cardDetails,
    cardChip,
    recipeTags,
    specialTagChip,
  } = styles;

  return (
    <Box sx={previewItemContainer} onClick={handleClick}>
      <Box sx={cardImageContainer}>
        <Chip
          label={category}
          variant="filled"
          sx={{ ...cardChip, ...recipeCategory }}
          color="primary"
        />
        <Card>
          <CardMedia
            component="img"
            image={imageURL[0]?.url || noPhotoPlaceholder}
            alt={title}
            sx={cardMedia}
          />
        </Card>
      </Box>
      <Box sx={cardDetails}>
        <Typography sx={recipeTitle}>{title}</Typography>
        <Chip
          label={formatMinutesRo(preparationTime)}
          color="info"
          variant="outlined"
          icon={<AccessTimeIcon />}
          sx={cardChip}
        />
        <Box sx={recipeTags}>
          {specialTag &&
            specialTag.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                variant="filled"
                sx={{ ...cardChip, ...specialTagChip }}
                color={tag === "Picant" ? "error" : "success"}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RecipeCard;
