import { StateCreator } from "zustand";

import { RecipesSlice, RootState } from "src/types/storeSlices";

export const createRecipesSlice: StateCreator<
  RootState,
  [],
  [],
  RecipesSlice
> = (set) => ({
  recipes: [],
  setExistingRecipes: (recipes) => set({ recipes }, false),
  displayedRecipe: null,
  setDisplayedRecipe: (displayedRecipe) => set({ displayedRecipe }, false),
});
