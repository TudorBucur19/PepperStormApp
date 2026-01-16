import { LoggedUserSlice, RootState } from "src/types/storeSlices";
import { StateCreator } from "zustand";

export const createLoggedUserSlice: StateCreator<
  RootState,
  [],
  [],
  LoggedUserSlice
> = (set) => ({
  loggedUser: null,
  setLoggedUser: (user) => set({ loggedUser: user }, false),
});
