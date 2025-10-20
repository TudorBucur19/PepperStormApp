import { useEffect } from "react";

import { dataBase } from "src/api/firebase";
import useDatabase from "src/hooks/useDatabase";
import { recipesCollectionName } from "src/constants/general";
import { useStore } from "src/store/rootStore";
import RecipesList from "src/components/RecipesList";
import GenericContainer from "src/components/common/GenericContainer";

const AllRecipesPage = () => {
  const { getCollectionData } = useDatabase(recipesCollectionName);
  const recipes = useStore((state) => state.recipes);

  useEffect(() => {
    getCollectionData();
  }, [dataBase]);

  return (
    <GenericContainer>
      <RecipesList allRecipes={recipes} />
    </GenericContainer>
  );
};

export default AllRecipesPage;
