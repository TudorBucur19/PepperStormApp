import { useEffect } from "react";
import Box from "@mui/material/Box";

import { dataBase } from "src/api/firebase";
import useDatabase from "src/hooks/useDatabase";
import { recipesCollectionName } from "src/constants/general";
import PreviewItem from "src/components/PreviewItem";
import { useStore } from "src/store/rootStore";
import Header from "src/components/Header/Header";

const LandingPage = () => {
  const { getCollectionData } = useDatabase(recipesCollectionName);
  const recipes = useStore((state) => state.recipes);

  useEffect(() => {
    getCollectionData();
  }, [dataBase]);

  return (
    <Box>
      <Header />
      <div>
        {recipes &&
          recipes.map((recipe) => (
            <PreviewItem key={recipe.id} recipe={recipe} />
          ))}
      </div>
    </Box>
  );
};

export default LandingPage;
