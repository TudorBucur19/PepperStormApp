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
    padding: { xs: "2rem 0 0 0", sm: "2rem" },
  },
  topContainer: {},
  imageBox: {
    flex: 1,
    maxWidth: { xs: "100%", sm: "50%" },
    aspectRatio: "3 / 4",
    borderRadius: { xs: 2, sm: 3 },
    objectFit: "cover",
    padding: { xs: 0, sm: "1rem" },
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

export const ingredientItemStyles = {
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    textAlign: "left",
    color: "#254a5d",
    fontSize: "1rem",
    borderBottom: "0.3px solid #254a5d4d",
    paddingY: "0.8rem",
    cursor: "pointer",
  },
  lastListItem: {
    borderBottom: "none",
    paddingBottom: "0",
  },
  checkBox: {
    visibility: "hidden",
    "&.Mui-checked": {
      visibility: "visible",
    },
  },
};

export const ingredientsListStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
  },
  listContainer: {
    maxWidth: "fit-content",
    minWidth: { xs: "100%", sm: "70%" },
    padding: "1.5rem",
    borderRadius: "1rem",
    backgroundColor: "#fff",
  },
  titleText: {
    fontSize: "2rem",
    color: "#337179",
    fontWeight: 700,
    textTransform: "uppercase",
  },
};

export const recipeHeaderStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  titleText: {
    fontSize: "2rem",
    color: "#337179",
    fontWeight: 700,
    textTransform: "uppercase",
  },
};

export const recipeMethodStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
  },
  titleText: {
    fontSize: "2rem",
    color: "#337179",
    fontWeight: 700,
    textTransform: "uppercase",
  },
  methodText: {
    whiteSpace: "pre-line",
    textAlign: "left",
    color: "#254a5d",
    fontSize: "1rem",
  },
};

export const ownerSectionStyles = {
  actionsContainer: {
    display: "flex",
    gap: 2,
    alignItems: "center",
  },
  ownerLabel: {
    fontSize: "1.2rem",
    fontWeight: 500,
    color: "primary.main",
  },
};
