import { StateCreator } from "zustand";

import { ModalSlice, RootState, ScreenSlice } from "src/types/storeSlices";

export const createScreenSlice: StateCreator<RootState, [], [], ScreenSlice> = (
  set,
) => ({
  screen: { isMobile: false },
  checkMobile: (mobile) => set({ screen: { isMobile: mobile } }, false),
});

export const createModalSlice: StateCreator<RootState, [], [], ModalSlice> = (
  set,
) => ({
  modal: { isOpen: false },
  setModalOpen: (isOpen) => set({ modal: { isOpen } }, false),
});
