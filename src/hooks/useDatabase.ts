import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

import { dataBase } from "src/api/firebase";
import { IDbRecipe, IRecipe } from "src/types/recipes";
import { useStore } from "src/store/rootStore";
// import { recipesMock } from "src/mocks/recipesMock";

const useDatabase = (collectionName: string) => {
  const setExisingRecipes = useStore((s) => s.setExistingRecipes);
  const getCollectionData = async () => {
    const recipesCollection = collection(dataBase, collectionName);
    const recipesSnapshot = await getDocs(recipesCollection);
    const recipesList = recipesSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as IDbRecipe,
    );

    setExisingRecipes(recipesList);
    // setExisingRecipes(recipesMock);
  };

  const addDocumentToCollection = async (newDoc: IRecipe) => {
    const collectionRef = collection(dataBase, collectionName);
    await addDoc(collectionRef, { recipe: newDoc });
  };

  const removeDocumentFromCollection = async (
    collectionName: string,
    documentId: string,
  ) => {
    try {
      await deleteDoc(doc(dataBase, collectionName, documentId));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
      throw error;
    }
  };

  const updateDocument = async (documentId: string, data: Partial<IRecipe>) => {
    console.log("DATA", data);

    try {
      const docRef = doc(dataBase, collectionName, documentId);
      await updateDoc(docRef, { recipe: { ...data } });
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
      throw error;
    }
  };

  // to fina a soluntion for partial term search
  const searchByTitle = async (title: string) => {
    const recipesCollection = collection(dataBase, collectionName);
    const q = query(
      recipesCollection,
      where("recipe.title", ">=", title),
      where("recipe.title", "<=", title + "\uf8ff"),
    );
    const querySnapshot = await getDocs(q);
    const recipesList = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as IDbRecipe,
    );
    setExisingRecipes(recipesList);
  };

  return {
    getCollectionData,
    addDocumentToCollection,
    updateDocument,
    removeDocumentFromCollection,
    searchByTitle,
  };
};

export default useDatabase;
