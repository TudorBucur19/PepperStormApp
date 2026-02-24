import { URLS } from "src/constants/urls";
export const RECIPES_COLLECTION_NAME = "recipes";
export const PHOTOS_COLLECTION_NAME = "images";
export const IDEAS_COLLECTION_NAME = "recipesIdeas";
export const IDEAS_PHOTOS_COLLECTION_NAME = "ideaPhotos";
// export const RECIPES_COLLECTION_NAME = "recipesDEV";
// export const PHOTOS_COLLECTION_NAME = "testPhotos";
// export const IDEAS_COLLECTION_NAME = "recipesIdeasDEV";
// export const IDEAS_PHOTOS_COLLECTION_NAME = "ideaPhotosDEV";

export const APP_NAME = "PepperStorm";
export const authMenuLabels = {
  login: "Conectează-te",
  logout: "Deconectează-te",
};

export const menuPages = [
  { label: "Acasă", link: URLS.HOME },
  { label: "Adaugă rețetă", link: URLS.ADD_RECIPE },
  { label: "Idei", link: URLS.IDEAS },
];

export const userSettingsMenu = (isLoggedIn: boolean) => [
  { label: authMenuLabels.logout, active: isLoggedIn },
  { label: authMenuLabels.login, active: !isLoggedIn },
];

export const specialTags = ["Vegetarian", "Vegan", "Picant"];
export const recipeCategories = [
  "salate",
  "pizza",
  "desert",
  "sosuri",
  "paste",
  "ciorbe / supe",
  "garnituri",
  "fel principal",
  "aperitiv",
  "international",
  "indian",
  "oriental",
  "Categorie nouă",
];
export const measures = [
  "buc",
  "grame",
  "kg",
  "ml",
  "l",
  "lingurițe",
  "linguri",
];

export const complexityLevels = {
  easy: "ușor",
  medium: "mediu",
  hard: "complex",
};
