import { ImageURL, RecipeAuthor } from "src/types/recipes";

export interface IRecipeIdea {
  title: string;
  description: string;
  campingFriendly?: boolean;
  imageURL: ImageURL[];
  author: RecipeAuthor;
  createdAt: Date | string;
}

export interface IDBRecipeIdea {
  id: string;
  idea: IRecipeIdea;
}
