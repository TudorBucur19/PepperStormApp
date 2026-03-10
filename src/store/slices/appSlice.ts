import { StateCreator } from "zustand";

import {
  ApiStatusSlice,
  EditingIdeaSlice,
  ModalSlice,
  RootState,
  ScreenSlice,
} from "src/types/storeSlices";

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

export const createApiStatusSlice: StateCreator<
  RootState,
  [],
  [],
  ApiStatusSlice
> = (set) => ({
  apiCallStatus: { isLoading: false, responseStatusOK: true },
  setApiCallStatus: (isLoading, responseStatusOK) =>
    set(
      {
        apiCallStatus: {
          isLoading,
          responseStatusOK: responseStatusOK ?? true,
        },
      },
      false,
    ),
});

export const createEditingIdeaSlice: StateCreator<
  RootState,
  [],
  [],
  EditingIdeaSlice
> = (set) => ({
  editingIdea: null,
  setEditingIdea: (idea) => set({ editingIdea: idea }, false),
});
