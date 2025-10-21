import { IDbRecipe, IIngredient } from "src/interfaces/recipes";

export interface ILogo {
  closeRecipe?: () => void;
}

export interface IRecipesList {
  allRecipes: IDbRecipe[];
}

export interface IPreviewItem {
  recipe: IDbRecipe;
}

export interface IGenericContainer {
  children: JSX.Element;
}

export interface IIngredientsList {
  ingredients: IIngredient[];
}

export interface IRecipHeader {
  title: string;
  preparationTime: number | string;
  servings: number;
  category: string;
  specialTag: string[];
}

export interface IRecipeMethod {
  prepSteps: string;
}
