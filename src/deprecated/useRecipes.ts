import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { IDbRecipe } from "src/interfaces/IRecipes";
import { IExistingRecipes } from "src/interfaces/IStore";

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
