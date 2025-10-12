import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import noPhotoPlaceholder from "src/assets/noPhotoPlaceholder.png";
import { IPreviewItem } from "src/interfaces/components";
import { formatMinutesRo } from "src/utils/uiFunctions";

const styles = {
  previewItemContainer: {
    cursor: "pointer",
    transition: "transform 180ms, box-shadow 180ms",
    "&:hover": {
      transform: "translateY(-8px)",
    },
  },
  cardImageContainer: {
    position: "relative",
    maxWidth: 300,
  },
  cardMedia: {
    aspectRatio: "3 / 4",
    transition: "transform 180ms",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  recipeCategory: {
    position: "absolute",
    top: 0,
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    border: "none",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "500",
  },

  cardDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "0.5rem",
    paddingY: "1rem",
  },
  recipeTitle: {
    fontSize: { xs: "1rem", sm: "1.2rem" },
    fontWeight: 700,
    color: "#337179",
    textTransform: "uppercase",
    textAlign: "left",
  },
  recipeTags: {
    display: "flex",
    gap: "0.5rem",
  },
  cardChip: {
    borderRadius: "8px",
    border: "2px solid",
    textTransform: "uppercase",
  },
};
const RecipeCard: React.FC<IPreviewItem> = ({ recipe }) => {
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
  } = styles;

  return (
    <Box sx={previewItemContainer}>
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
                variant="outlined"
                sx={cardChip}
                color="success"
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RecipeCard;
