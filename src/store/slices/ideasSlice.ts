import { StateCreator } from "zustand";

import { IdeasSlice, RootState } from "src/types/storeSlices";

export const createIdeasSlice: StateCreator<RootState, [], [], IdeasSlice> = (
  set,
) => ({
  ideas: [],
  setExistingIdeas: (ideas) => set({ ideas }, false),
  removeIdea: (id: string) =>
    set((state) => ({
      ideas: state.ideas.filter((idea) => idea.id !== id),
    })),
});
