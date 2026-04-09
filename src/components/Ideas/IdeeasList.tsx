import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";

import NewIdeaForm from "src/components/Ideas/NewIdeaForm";
import IdeaItem from "src/components/Ideas/IdeaItem";
import LoadingPlaceholder from "src/components/common/LoadingPlaceholder";
import ErrorFallback from "src/components/common/ErrorFallback";
import useIdeasDatabase from "src/hooks/useIdeasDatabase";
import { useAuthContext } from "src/hooks/AuthContext";
import { IDBRecipeIdea } from "src/types/ideas";
import { QUERY_KEYS } from "src/constants/appConfigValues";

import { ideasListStyles as styles } from "src/components/styles/ideas.styles";

const IdeeasList = () => {
  const { getIdeasCollectionData } = useIdeasDatabase();
  const { loggedUser } = useAuthContext();
  const {
    data: ideas = [],
    isLoading,
    isError,
  } = useQuery<IDBRecipeIdea[]>({
    queryKey: QUERY_KEYS.IDEAS_QUERY_KEY,
    queryFn: async () => (await getIdeasCollectionData()) ?? [],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingPlaceholder />;
  if (isError) return <ErrorFallback errorMessage="Error fetching ideas" />;

  return (
    <Box sx={styles.container}>
      {ideas.map((idea) => (
        <IdeaItem key={idea.id} ideaItem={idea} />
      ))}
      {loggedUser && <NewIdeaForm />}
    </Box>
  );
};

export default IdeeasList;
