import { collection, getDocs } from "firebase/firestore";

import useRecipes from "src/store/useRecipes";
import { dataBase } from "src/api/firebase";
import { IDbRecipe } from "src/interfaces/IRecipes";
import { IExistingRecipes } from "src/interfaces/IStore";

const useDatabase = (collectionName: string) => {
    const setExisingRecipes = useRecipes((state: IExistingRecipes) => state.setExistingRecipes);
    const getCollectionData = async () => {
        const recipesCollection = collection(dataBase, collectionName);        
        const recipesSnapshot = await getDocs(recipesCollection);
        const recipesList = recipesSnapshot.docs.map(doc => (
            {
                id: doc.id,
                ...doc.data(),
            } as IDbRecipe
        ));               
        
        setExisingRecipes(recipesList)
    }

    return { getCollectionData }
}

export default useDatabase;