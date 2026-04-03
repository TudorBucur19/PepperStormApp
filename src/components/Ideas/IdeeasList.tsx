import { useEffect } from "react";
import Box from "@mui/material/Box";

import NewIdeaForm from "src/components/Ideas/NewIdeaForm";
import IdeaItem from "src/components/Ideas/IdeaItem";
import LoadingPlaceholder from "src/components/common/LoadingPlaceholder";
import useIdeasDatabase from "src/hooks/useIdeasDatabase";
import { useStore } from "src/store/rootStore";
import { useAuthContext } from "src/hooks/AuthContext";

import { ideasListStyles as styles } from "src/components/styles/ideas.styles";

const IdeeasList = () => {
  const { getIdeasCollectionData } = useIdeasDatabase();
  const isLoading = useStore((state) => state.apiCallStatus.isLoading);
  const setApiCallStatus = useStore((state) => state.setApiCallStatus);
  const ideas = useStore((state) => state.ideas);
  const { loggedUser } = useAuthContext();

  useEffect(() => {
    const fetchIdeas = async () => {
      setApiCallStatus(true);
      await getIdeasCollectionData();
      setApiCallStatus(false);
    };
    fetchIdeas();
  }, []);

  return (
    <Box sx={styles.container}>
      {isLoading && <LoadingPlaceholder />}
      {ideas && ideas.map((idea) => <IdeaItem key={idea.id} ideaItem={idea} />)}
      {loggedUser && <NewIdeaForm />}
    </Box>
  );
};

export default IdeeasList;
