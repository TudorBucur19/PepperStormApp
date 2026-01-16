import { IDbRecipe, RecipeAuthor } from "src/types/recipes";

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

export type LoggedUserSlice = {
  loggedUser: RecipeAuthor | null;
  setLoggedUser: (user: RecipeAuthor | null) => void;
};

export type RootState = ScreenSlice & RecipesSlice & LoggedUserSlice;
