import { collection, getDocs } from "firebase/firestore";

import { dataBase } from "src/api/firebase";
import { IDbRecipe } from "src/interfaces/IRecipes";
import { useStore } from "src/store/rootStore";

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
        } as IDbRecipe)
    );

    setExisingRecipes(recipesList);
  };

  return { getCollectionData };
};

export default useDatabase;
