import { IDbRecipe } from "src/interfaces/IRecipes";

export type ScreenSlice = {
  screen: { isMobile: boolean };
  checkMobile: (mobile: boolean) => void;
};

export type RecipesSlice = {
  recipes: IDbRecipe[];
  setExistingRecipes: (recipes: IDbRecipe[]) => void;
};

export type RootState = ScreenSlice & RecipesSlice;
