import { useEffect } from "react";

import useDatabase from "src/hooks/useDatabase";
import { RECIPES_COLLECTION_NAME } from "src/constants/appConfigValues";
import { useStore } from "src/store/rootStore";
import RecipesList from "src/components/RecipesList/RecipesList";
import GenericContainer from "src/components/common/GenericContainer";

const AllRecipesPage = () => {
  const { getCollectionData } = useDatabase(RECIPES_COLLECTION_NAME);
  const recipes = useStore((state) => state.recipes);

  useEffect(() => {
    getCollectionData();
  }, []);

  return (
    <GenericContainer>
      <RecipesList allRecipes={recipes} />
    </GenericContainer>
  );
};

export default AllRecipesPage;
