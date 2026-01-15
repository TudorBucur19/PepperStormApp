import { IDbRecipe } from "src/types/recipes";

export type ScreenSlice = {
  screen: { isMobile: boolean };
  checkMobile: (mobile: boolean) => void;
};

export type RecipesSlice = {
  recipes: IDbRecipe[];
  setExistingRecipes: (recipes: IDbRecipe[]) => void;
  displayedRecipe: IDbRecipe | null;
  setDisplayedRecipe: (recipe: IDbRecipe) => void;
};

export type RootState = ScreenSlice & RecipesSlice;
