import {
  ingredientsListStyles,
  ingredientItemStyles,
} from "../styles/recipeDetails.styles";

export const itemListStyles = {
  pageContainer: {
    ...ingredientsListStyles.container,
    paddingX: { xs: "1rem", sm: 0 },
  },
  listcontainer: {
    ...ingredientsListStyles.listContainer,
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  listItem: {
    ...ingredientItemStyles.listItem,
    pointerEvents: "none",
  },
  lastListItem: {
    ...ingredientItemStyles.lastListItem,
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
