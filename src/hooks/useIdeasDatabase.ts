import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { dataBase } from "src/api/firebase";
import {
  DB_DOC_ROOT_KEYS,
  IDEAS_COLLECTION_NAME,
} from "src/constants/appConfigValues";
import {
  addNestedDocumentToCollection,
  removeDocumentFromCollection,
  updateNestedDocument,
} from "src/hooks/database/database.utils";
import { IDBRecipeIdea, IRecipeIdea } from "src/types/ideas";

const useIdeasDatabase = () => {
  const getIdeasCollectionData = async () => {
    const ideasCollection = collection(dataBase, IDEAS_COLLECTION_NAME);
    const ideasQuery = query(ideasCollection, orderBy("idea.title", "asc"));
    const ideasSnapshot = await getDocs(ideasQuery);
    return ideasSnapshot.docs.map(
      (ideaDoc) =>
        ({
          id: ideaDoc.id,
          ...ideaDoc.data(),
        }) as IDBRecipeIdea,
    );
  };

  const addIdeaToCollection = async (newIdea: IRecipeIdea) =>
    addNestedDocumentToCollection(
      IDEAS_COLLECTION_NAME,
      DB_DOC_ROOT_KEYS.IDEA,
      newIdea,
    );

  const updateIdea = async (documentId: string, data: Partial<IRecipeIdea>) =>
    updateNestedDocument(
      IDEAS_COLLECTION_NAME,
      DB_DOC_ROOT_KEYS.IDEA,
      documentId,
      data,
    );

  const removeIdea = async (documentId: string) =>
    removeDocumentFromCollection(IDEAS_COLLECTION_NAME, documentId);

  return {
    addIdeaToCollection,
    getIdeasCollectionData,
    removeIdea,
    updateIdea,
  };
};

export default useIdeasDatabase;
