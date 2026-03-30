import { StateCreator } from "zustand";

import { RootState, toDoListSlice } from "src/types/storeSlices";

export const createToDoListSlice: StateCreator<
  RootState,
  [],
  [],
  toDoListSlice
> = (set) => ({
  toDoList: [],
  setToDoList: (list) => set({ toDoList: list }, false),
  removeItemFromList: (id) =>
    set((state) => ({
      toDoList: state.toDoList.filter((todoItem) => todoItem.id !== id),
    })),
});
