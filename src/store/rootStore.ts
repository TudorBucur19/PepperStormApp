import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { RootState } from "src/interfaces/storeSlices";
import { createScreenSlice } from "src/store/slices/appSlice";
import { createRecipesSlice } from "src/store/slices/recipesSlice";

export const useStore = create<RootState>()(
  devtools(
    (set, get, store) => ({
      ...createScreenSlice(set, get, store),
      ...createRecipesSlice(set, get, store),
    }),
    { name: "RootStore" }
  )
);
