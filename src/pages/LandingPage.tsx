import { useEffect } from "react";

import { dataBase } from "src/api/firebase";
import useDatabase from "src/hooks/useDatabase";
import useRecipes from "src/store/useRecipes";
import { recipesCollectionName } from "src/constants/general";

const LandingPage = () => {
    const { getCollectionData } = useDatabase(recipesCollectionName);
    const recipes = useRecipes(state =>  state.recipes);       

    useEffect(() => {
        getCollectionData()
    }, [dataBase])
    
    return ( 
        <div>
            {recipes && recipes.map(recipe => <p key={recipe.id}>{recipe.recipe.title}</p>)}
        </div>
     );
}
 
export default LandingPage;