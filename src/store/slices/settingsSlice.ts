import { StateCreator } from "zustand";

import { SettingsSlice, RootState } from "src/types/storeSlices";

export const createAppSettingsSlice: StateCreator<
  RootState,
  [],
  [],
  SettingsSlice
> = (set) => ({
  appSettings: { categories: [], specialTags: [], measures: [] },
  setAppSettings: (settings) =>
    set(
      (state) => ({
        appSettings:
          typeof settings === "function"
            ? settings(state.appSettings)
            : settings,
      }),
      false,
    ),
});
