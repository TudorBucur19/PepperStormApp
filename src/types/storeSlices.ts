import { IDBRecipeIdea } from "src/types/ideas";
import { IDbRecipe, RecipeAuthor } from "src/types/recipes";

export type ScreenSlice = {
  screen: { isMobile: boolean };
  checkMobile: (mobile: boolean) => void;
};

export type ModalSlice = {
  modal: { isOpen: boolean };
  setModalOpen: (isOpen: boolean) => void;
};

export type ApiStatusSlice = {
  apiCallStatus: { isLoading: boolean; responseStatusOK: boolean };
  setApiCallStatus: (isLoading: boolean, responseStatusOK?: boolean) => void;
};

export type RecipesSlice = {
  recipes: IDbRecipe[];
  setExistingRecipes: (recipes: IDbRecipe[]) => void;
  displayedRecipe: IDbRecipe | null;
  setDisplayedRecipe: (recipe: IDbRecipe | null) => void;
};

export type LoggedUserSlice = {
  loggedUser: RecipeAuthor | null;
  setLoggedUser: (user: RecipeAuthor | null) => void;
};

export type IdeasSlice = {
  ideas: IDBRecipeIdea[];
  setExistingIdeas: (ideas: IDBRecipeIdea[]) => void;
  removeIdea: (id: string) => void;
};

export type RootState = ScreenSlice &
  ModalSlice &
  RecipesSlice &
  IdeasSlice &
  ApiStatusSlice;
