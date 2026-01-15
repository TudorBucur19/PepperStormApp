import { RootState, ScreenSlice } from "src/types/storeSlices";
import { StateCreator } from "zustand";

export const createScreenSlice: StateCreator<RootState, [], [], ScreenSlice> = (
  set
) => ({
  screen: { isMobile: false },
  checkMobile: (mobile) => set({ screen: { isMobile: mobile } }, false),
});
