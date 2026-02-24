import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getCountFromServer,
  orderBy,
} from "firebase/firestore";

import { dataBase } from "src/api/firebase";
import { IDbRecipe, IRecipe } from "src/types/recipes";
import { useStore } from "src/store/rootStore";
import { IDBRecipeIdea, IRecipeIdea } from "src/types/ideas";
// import { recipesMock } from "src/mocks/recipesMock";
// import { ideasMock } from "src/mocks/ideasMock";

const useDatabase = (collectionName: string) => {
  const setExisingRecipes = useStore((s) => s.setExistingRecipes);
  const setExisingIdeas = useStore((s) => s.setExistingIdeas);
  const getCollectionData = async () => {
    const recipesCollection = collection(dataBase, collectionName);
    const q = query(recipesCollection, orderBy("recipe.title", "asc"));
    const recipesSnapshot = await getDocs(q);
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

  const getIdeasCollectionData = async () => {
    const ideasCollection = collection(dataBase, collectionName);
    const q = query(ideasCollection, orderBy("idea.title", "asc"));
    const ideasSnapshot = await getDocs(q);
    const ideasList = ideasSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as IDBRecipeIdea,
    );

    setExisingIdeas(ideasList);
    // setExisingIdeas(ideasMock);
  };

  const getRecipeById = async (id: string) => {
    try {
      const docRef = doc(dataBase, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as IDbRecipe;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching recipe by id:", error);
      throw error;
    }
  };

  const addDocumentToCollection = async (newDoc: IRecipe) => {
    const collectionRef = collection(dataBase, collectionName);
    await addDoc(collectionRef, { recipe: newDoc });
  };

  const addIdeaToCollection = async (newDoc: IRecipeIdea) => {
    const collectionRef = collection(dataBase, collectionName);
    await addDoc(collectionRef, { idea: newDoc });
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

  const getTotalPosts = async () => {
    const collectionRef = collection(dataBase, collectionName);
    const snapshot = await getCountFromServer(collectionRef);
    return snapshot.data().count;
  };

  return {
    getCollectionData,
    addDocumentToCollection,
    updateDocument,
    removeDocumentFromCollection,
    searchByTitle,
    getRecipeById,
    getTotalPosts,
    addIdeaToCollection,
    getIdeasCollectionData,
  };
};

export default useDatabase;
