import { StateCreator } from "zustand";

import { IdeasSlice, RootState } from "src/types/storeSlices";

export const createIdeasSlice: StateCreator<RootState, [], [], IdeasSlice> = (
  set,
) => ({
  ideas: [],
  setExistingIdeas: (ideas) => set({ ideas }, false),
});
