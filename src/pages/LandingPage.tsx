import { useEffect } from "react";
import Box from "@mui/material/Box";

import { dataBase } from "src/api/firebase";
import useDatabase from "src/hooks/useDatabase";
import { recipesCollectionName } from "src/constants/general";
import { useStore } from "src/store/rootStore";
import Header from "src/components/Header/Header";
import RecipesList from "src/components/RecipesList";

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
};

const LandingPage = () => {
  const { getCollectionData } = useDatabase(recipesCollectionName);
  const recipes = useStore((state) => state.recipes);
  const { container } = styles;

  useEffect(() => {
    getCollectionData();
  }, [dataBase]);

  return (
    <Box sx={container}>
      <Header />
      <RecipesList allRecipes={recipes} />
    </Box>
  );
};

export default LandingPage;
