import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { RootState } from "src/types/storeSlices";
import { createScreenSlice } from "src/store/slices/appSlice";
import { createRecipesSlice } from "src/store/slices/recipesSlice";
import { createLoggedUserSlice } from "src/store/slices/authSlice";

export const useStore = create<RootState>()(
  devtools(
    // persist(
    (set, get, store) => ({
      ...createScreenSlice(set, get, store),
      ...createRecipesSlice(set, get, store),
      ...createLoggedUserSlice(set, get, store),
    }),
    { name: "RootStore" },
    // )
  ),
);
