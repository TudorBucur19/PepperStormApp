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
    paddingY: "0.8rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  listItem: {
    ...ingredientItemStyles.listItem,
    pointerEvents: "none",
  },
  listItemAction: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    minWidth: "2.5rem",
    pointerEvents: "auto",
  },
  lastListItem: {
    ...ingredientItemStyles.lastListItem,
  },
  expandableSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    width: "100%",
  },
  expandableTriggers: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
    width: "100%",
  },
  expandableTrigger: {
    minWidth: "fit-content",
  },
  expandableContent: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    paddingTop: "0.5rem",
  },
  shareSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    width: "100%",
  },
  shareForm: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: "0.75rem",
    width: "100%",
  },
  shareActions: {
    display: "flex",
    gap: "1rem",
    flexDirection: { xs: "column-reverse", sm: "row" },
    alignItems: { xs: "flex-end", sm: "center" },
    justifyContent: "space-between",
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
