import { RootState, ScreenSlice } from "src/interfaces/storeSlices";
import { StateCreator } from "zustand";

export const createScreenSlice: StateCreator<RootState, [], [], ScreenSlice> = (
  set
) => ({
  screen: { isMobile: false },
  checkMobile: (mobile) => set({ screen: { isMobile: mobile } }, false),
});
