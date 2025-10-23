import { SxProps, Theme } from "@mui/material";
import { IDbRecipe, IIngredient } from "src/interfaces/recipes";

export interface ILogo {
  closeRecipe?: () => void;
}

export interface IRecipesList {
  allRecipes: IDbRecipe[];
}

export interface IPreviewItem {
  recipe: IDbRecipe;
}

export interface IGenericContainer {
  children: JSX.Element;
}

export interface IIngredientsList {
  ingredients: IIngredient[];
}

export interface IRecipHeader {
  title: string;
  preparationTime: number | string;
  servings: number;
  category: string;
  specialTag: string[];
}

export interface IRecipeMethod {
  prepSteps: string;
}
export interface IIngredientItem {
  ingredient: IIngredient;
  isLast: boolean;
}
export type PsButtonVariant = "basic" | "text" | "contained" | "outlined";
export type PsButtonColor =
  | "transparent"
  | "primary"
  | "secondary"
  | "secondaryDark"
  | "secondaryLight"
  | "secondaryWhite"
  | "black"
  | "transparentBlack";

export interface IPsButton {
  children?: string | React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant: PsButtonVariant;
  color?: PsButtonColor;
  fullWidth?: boolean;
  fitContentWidth?: boolean;
  disabled?: boolean;
  identifierId?: string;
  isLoading?: boolean;
  ariaLabel?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  type?: "button" | "submit" | "reset";
  sx?: SxProps<Theme>;
  size?: "small" | "medium" | "large";
  className?: string;
}
