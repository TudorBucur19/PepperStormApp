import { StateCreator } from "zustand";

import { RecipesSlice, RootState } from "src/interfaces/storeSlices";

export const createRecipesSlice: StateCreator<
  RootState,
  [],
  [],
  RecipesSlice
> = (set) => ({
  recipes: [],
  setExistingRecipes: (recipes) => set({ recipes }, false),
});
