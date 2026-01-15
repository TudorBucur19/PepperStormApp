import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { IDbRecipe } from "src/types/recipes";
import { IExistingRecipes } from "src/types/store";

const useRecipes = create<IExistingRecipes>()(
  devtools((set) => ({
    recipes: [],
    setExistingRecipes: (recipes: IDbRecipe[]) =>
      set((state: IExistingRecipes) => ({
        ...state,
        recipes: recipes,
      })),
  }))
);

export default useRecipes;
