import { IDbRecipe } from "src/interfaces/IRecipes";

export interface IScreenSizeState {
    screen: {
        isMobile: boolean;
    };
    checkMobile: (mobile: boolean) => void;
}

export interface IExistingRecipes {
    recipes: IDbRecipe[];
    setExistingRecipes: (recipes: IDbRecipe[]) => void;
}