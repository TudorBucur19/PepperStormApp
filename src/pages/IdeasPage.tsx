import GenericContainer from "src/components/common/GenericContainer";
import PageTitle from "src/components/common/PageTitle";
import IdeeasList from "src/components/Ideas/IdeeasList";

const IdeasPage = () => {
  return (
    <GenericContainer>
      <>
        <PageTitle>Idei de preparate</PageTitle>
        <IdeeasList />
      </>
    </GenericContainer>
  );
};

export default IdeasPage;
