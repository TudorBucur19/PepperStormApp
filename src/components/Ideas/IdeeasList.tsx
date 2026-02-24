import Box from "@mui/material/Box";

import NewIdeaForm from "src/components/Ideas/NewIdeaForm";
import IdeaItem from "src/components/Ideas/IdeaItem";
import { IIdeasList } from "src/types/components";

import { ideasListStyles as styles } from "src/components/styles/ideas.styles";

const IdeeasList = ({ ideas }: IIdeasList) => {
  return (
    <Box sx={styles.container}>
      {ideas && ideas.map((idea) => <IdeaItem key={idea.id} ideaItem={idea} />)}
      <NewIdeaForm />
    </Box>
  );
};

export default IdeeasList;
