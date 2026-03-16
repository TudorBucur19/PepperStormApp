export const recipesListStyles = {
  recipesContainer: {
    display: "grid",
    gridTemplateColumns: {
      xs: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
      lg: "repeat(4, 1fr)",
    },
    columnGap: { xs: "1.2rem", sm: "1.6rem", md: "2rem" },
    rowGap: { xs: "2rem", sm: "2rem", md: "3rem" },
    padding: "1rem",
  },
};

export const previewItemStyles = {
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
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  cardChip: {
    borderRadius: "8px",
    border: "none",
    textTransform: "uppercase",
  },
  specialTagChip: {},
};
