import { IDbRecipe } from "src/types/recipes";

export interface IScreenSizeState {
  screen: {
    isMobile: boolean;
  };
  checkMobile: (mobile: boolean) => void;
}

export interface IExistingRecipes {
  recipes: IDbRecipe[];
  setExistingRecipes: (recipes: IDbRecipe[]) => void;
}
