import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { RootState } from "src/types/storeSlices";
import {
  createApiStatusSlice,
  createEditingIdeaSlice,
  createModalSlice,
  createScreenSlice,
} from "src/store/slices/appSlice";
import { createRecipesSlice } from "src/store/slices/recipesSlice";
import { createIdeasSlice } from "src/store/slices/ideasSlice";

export const useStore = create<RootState>()(
  devtools(
    // persist(
    (set, get, store) => ({
      ...createScreenSlice(set, get, store),
      ...createRecipesSlice(set, get, store),
      ...createModalSlice(set, get, store),
      ...createApiStatusSlice(set, get, store),
      ...createIdeasSlice(set, get, store),
      ...createEditingIdeaSlice(set, get, store),
    }),
    { name: "RootStore" },
    // )
  ),
);
