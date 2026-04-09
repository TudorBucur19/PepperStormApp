import { URLS } from "src/constants/urls";
//----------------------------------------------//
// export const RECIPES_COLLECTION_NAME = "recipes";
// export const RECIPES_PHOTOS_COLLECTION_NAME = "images";
export const IDEAS_COLLECTION_NAME = "recipesIdeas";
export const IDEAS_PHOTOS_COLLECTION_NAME = "ideaPhotos";
export const TO_DO_LIST_COLLECTION_NAME = "todoList";
export const SETTINGS_COLLECTION_NAME = "appSettings";
//----------------------------------------------//
export const RECIPES_COLLECTION_NAME = "recipesDEV";
export const RECIPES_PHOTOS_COLLECTION_NAME = "testPhotos";
// export const IDEAS_COLLECTION_NAME = "recipesIdeasDEV";
// export const IDEAS_PHOTOS_COLLECTION_NAME = "ideaPhotosDEV";

export const APP_SETTINGS = {
  CATEGORIES: "categories",
  MEASURES: "measures",
  SPECIAL_TAGS: "specialTags",
};

export const DB_DOC_ROOT_KEYS = {
  RECIPE: "recipe",
  IDEA: "idea",
};

export const APP_NAME = "PepperStorm";
export const authMenuLabels = {
  login: "Conectează-te",
  logout: "Deconectează-te",
};

export const menuPages = [
  { label: "Rețete", link: URLS.HOME },
  { label: "Adaugă rețetă", link: URLS.ADD_RECIPE },
  { label: "Inspirații", link: URLS.IDEAS },
  { label: "Planuri", link: URLS.TODO },
];

export const userSettingsMenu = (isLoggedIn: boolean) => [
  { label: authMenuLabels.logout, active: isLoggedIn },
  { label: authMenuLabels.login, active: !isLoggedIn },
];

export const complexityLevels = {
  easy: "ușor",
  medium: "mediu",
  hard: "complex",
};

export const QUERY_KEYS = {
  ALL_RECIPES_QUERY_KEY: ["allRecipes"],
  IDEAS_QUERY_KEY: ["ideas"],
  TODO_LIST_QUERY_KEY: ["todoList"],
  APP_SETTINGS_QUERY_KEY: ["appSettings"],
};

// moved to appSettings in db, keep here as default values for backup
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
  "thai",
  "indian",
  "oriental",
  "patiserie",
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
