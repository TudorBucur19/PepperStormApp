import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { dataBase } from "src/api/firebase";
import {
  DB_DOC_ROOT_KEYS,
  RECIPES_COLLECTION_NAME,
} from "src/constants/appConfigValues";
import {
  addNestedDocumentToCollection,
  removeDocumentFromCollection,
  updateNestedDocument,
} from "src/hooks/database/database.utils";
import { useStore } from "src/store/rootStore";
import { IDbRecipe, IRecipe } from "src/types/recipes";

const useRecipesDatabase = () => {
  const setExistingRecipes = useStore((state) => state.setExistingRecipes);

  const getRecipesCollectionData = async () => {
    const recipesCollection = collection(dataBase, RECIPES_COLLECTION_NAME);
    const recipesQuery = query(
      recipesCollection,
      orderBy("recipe.title", "asc"),
    );
    const recipesSnapshot = await getDocs(recipesQuery);
    const recipesList = recipesSnapshot.docs.map(
      (recipeDoc) =>
        ({
          id: recipeDoc.id,
          ...recipeDoc.data(),
        }) as IDbRecipe,
    );

    return recipesList;
  };

  const getRecipeById = async (id: string) => {
    try {
      const docRef = doc(dataBase, RECIPES_COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null;
      }

      return { id: docSnap.id, ...docSnap.data() } as IDbRecipe;
    } catch (error) {
      console.error("Error fetching recipe by id:", error);
      throw error;
    }
  };

  const addRecipeToCollection = async (newRecipe: IRecipe) =>
    addNestedDocumentToCollection(
      RECIPES_COLLECTION_NAME,
      DB_DOC_ROOT_KEYS.RECIPE,
      newRecipe,
    );

  const updateRecipe = async (documentId: string, data: Partial<IRecipe>) =>
    updateNestedDocument(
      RECIPES_COLLECTION_NAME,
      DB_DOC_ROOT_KEYS.RECIPE,
      documentId,
      data,
    );

  const removeRecipe = async (documentId: string) =>
    removeDocumentFromCollection(RECIPES_COLLECTION_NAME, documentId);

  const searchRecipesByTitle = async (title: string) => {
    const recipesCollection = collection(dataBase, RECIPES_COLLECTION_NAME);
    const recipesQuery = query(
      recipesCollection,
      where("recipe.title", ">=", title),
      where("recipe.title", "<=", title + "\uf8ff"),
    );
    const querySnapshot = await getDocs(recipesQuery);
    const recipesList = querySnapshot.docs.map(
      (recipeDoc) =>
        ({
          id: recipeDoc.id,
          ...recipeDoc.data(),
        }) as IDbRecipe,
    );

    setExistingRecipes(recipesList);
  };

  const getTotalRecipes = async () => {
    const collectionRef = collection(dataBase, RECIPES_COLLECTION_NAME);
    const snapshot = await getCountFromServer(collectionRef);
    return snapshot.data().count;
  };

  return {
    addRecipeToCollection,
    getRecipeById,
    getRecipesCollectionData,
    getTotalRecipes,
    removeRecipe,
    searchRecipesByTitle,
    updateRecipe,
  };
};

export default useRecipesDatabase;
