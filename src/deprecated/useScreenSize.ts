import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { IScreenSizeState } from "src/interfaces/IStore";

const useScreenSize = create<IScreenSizeState>()(
  devtools(
    (set) => ({
      screen: { isMobile: false },
      checkMobile: (mobile) => set({ screen: { isMobile: mobile } }),
    }),
    { name: "ScreenSizeStore" }
  )
);

export default useScreenSize;
