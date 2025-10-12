import { IDbRecipe } from "src/interfaces/IRecipes";

export interface ILogo {
  closeRecipe?: () => void;
}

export interface IRecipesList {
  allRecipes: IDbRecipe[];
}

export interface IPreviewItem {
  recipe: IDbRecipe;
}
