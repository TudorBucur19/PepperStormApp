import { SxProps, Theme } from "@mui/material";

import {
  IDbRecipe,
  IIngredient,
  ImageURL,
  RecipeAuthor,
  RecipeComplexity,
} from "src/types/recipes";

export interface ICatLogo {
  onClick?: () => void;
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
  documentId: string;
  title: string;
  preparationTime: number | string;
  servings: number;
  category: string;
  specialTag: string[];
  owner: RecipeAuthor;
  complexity: RecipeComplexity;
}

export interface IRecipeMethod {
  prepSteps: string;
  spices: string;
}
export interface IIngredientItem {
  ingredient: IIngredient;
  isLast: boolean;
}

export interface IIngredientsForm {
  index: number;
  isEmptyForm: boolean;
  append: (value: IIngredient) => void;
  remove: (index: number) => void;
}

export type PsButtonVariant = "basic" | "text" | "contained" | "outlined";
export type PsButtonColor = "transparent" | "primary" | "secondary" | "danger";

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
  className?: string;
}

export interface IChipInfo {
  label: string;
  variant: "filled" | "outlined";
  color: "primary" | "secondary" | "error" | "success" | "info" | "warning";
  useCase: "specialTag" | "category" | "cardTop";
}

export interface IIconTextProperty {
  icon: React.ReactNode;
  text: string;
  textStyle?: SxProps<Theme>;
}

export interface IImagePreview<T> {
  imageSrc: string;
  title: string;
  index: number;
  files: T;
}

export interface IOwnerSection {
  owner: RecipeAuthor;
  documentId: string;
}

export interface IImageCarousel {
  images: ImageURL[];
}

export interface IErrorFallback {
  errorMessage?: string;
  title?: string;
}

export interface IDialogBox {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  confirmAction?: () => void;
}
