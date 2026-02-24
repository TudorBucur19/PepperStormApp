import { useEffect } from "react";

import GenericContainer from "src/components/common/GenericContainer";
import PageTitle from "src/components/common/PageTitle";
import IdeeasList from "src/components/Ideas/IdeeasList";
import { IDEAS_COLLECTION_NAME } from "src/constants/appConfigValues";
import useDatabase from "src/hooks/useDatabase";
import { useStore } from "src/store/rootStore";

const IdeasPage = () => {
  const { getIdeasCollectionData } = useDatabase(IDEAS_COLLECTION_NAME);
  const ideas = useStore((state) => state.ideas);

  useEffect(() => {
    getIdeasCollectionData();
  }, []);

  return (
    <GenericContainer>
      <>
        <PageTitle>Idei de preparate</PageTitle>
        <IdeeasList ideas={ideas} />
      </>
    </GenericContainer>
  );
};

export default IdeasPage;
