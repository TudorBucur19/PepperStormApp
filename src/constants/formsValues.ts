import { NewIdeaValues } from "src/schemas/ideasSchemas";
import { FormValues } from "src/schemas/newRecipeSchemas";

export const EMPTY_IDEA_VALUES: NewIdeaValues = {
  title: "",
  description: "",
  campingFriendly: false,
  imageURL: [],
};

export const DEFAULT_RECIPE_VALUES: FormValues = {
  title: "",
  category: "",
  servings: 1,
  preparationTime: 10,
  prepSteps: "",
  recipeIngredients: [],
  specialTag: [],
  imageURL: [],
  complexity: "medium",
};
