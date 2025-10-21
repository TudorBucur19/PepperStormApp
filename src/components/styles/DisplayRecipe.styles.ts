export const recipeDisplayStyles = {
  titleText: {
    fontSize: "2rem",
    color: "#337179",
    fontWeight: 700,
    textTransform: "uppercase",
  },

  halfPageContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: 4,
    marginBottom: 4,
    borderRadius: "1rem",
    padding: { xs: "2rem", sm: "2rem" },
  },
  topContainer: {},
  imageBox: {
    flex: 1,
    maxWidth: { xs: "100%", sm: "50%" },
    aspectRatio: "3 / 4",
    borderRadius: { xs: 2, sm: 3 },
    objectFit: "cover",
    padding: { xs: "0", sm: "1rem" },
  },
  detailsBox: {
    flex: 1,
  },
  methodBox: {
    flex: 1,
  },
  ingredientsBox: {
    flex: 1,
  },
  bottomContainer: {
    backgroundColor: "#f4f6f7",
  },
  gridVariant: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
    gridTemplateRows: { xs: "auto", sm: "1fr 1fr" },
    gap: 2,
  },
};
