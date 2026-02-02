export const chipInfoStyles = {
  cardChip: {
    borderRadius: "8px",
    border: "none",
    textTransform: "uppercase",
  },
  recipeCategory: {
    border: "none",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "500",
  },
  cardTop: {
    position: "absolute",
    top: 0,
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    border: "none",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "500",
  },
};

export const genericContainerStyles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    paddingTop: "2rem",
  },
};

export const searchInputStyles = {
  inputContainer: {
    width: "100%",
    p: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    ml: 1,
    flex: 1,
  },
  icon: {
    padding: "0.625rem",
  },
};

export const errorFallbackStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    marginY: 6,
  },
};

export const loadingPlaceholderStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    margin: "auto",
  },
};

export const iconsTextPropertyStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  text: {
    color: "primary.main",
    fontSize: "1rem",
    fontWeight: 500,
    textTransform: "uppercase",
  },
};
