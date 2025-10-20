export const styles = {
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
    border: "none",
    textTransform: "uppercase",
  },
  specialTagChip: {},
};
