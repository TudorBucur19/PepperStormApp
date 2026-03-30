import { ingredientsListStyles as styles } from "../styles/recipeDetails.styles";

export const itemListStyles = {
  pageContainer: {
    ...styles.container,
    paddingX: { xs: "1rem", sm: 0 },
  },
  listcontainer: {
    ...styles.listContainer,
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
};

export const listItemFormStyles = {
  form: {
    display: "flex",
    gap: "0.75rem",
    width: "100%",
    alignItems: "center",
    flexDirection: { xs: "column", sm: "row" },
  },
  input: {
    flex: 1,
    width: "100%",
  },
};
