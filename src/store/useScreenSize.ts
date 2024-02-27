import { create } from 'zustand';

import { IScreenSizeState } from 'src/interfaces/IStore';

const useScreenSize = create<IScreenSizeState>((set) => ({
    screen: {
        isMobile: false,
    },
    checkMobile: (mobile: boolean) =>
        set((state: IScreenSizeState) => ({
            ...state,
            screen: {
                isMobile: mobile,
            }
        }
    )),
}));

export default useScreenSize;