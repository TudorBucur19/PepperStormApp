import {
  addDoc,
  collection,
  deleteDoc,
  DocumentData,
  doc,
  UpdateData,
  updateDoc,
} from "firebase/firestore";

import { dataBase } from "src/api/firebase";

export const addNestedDocumentToCollection = async <T extends object>(
  collectionName: string,
  documentRootKey: string,
  newDoc: T,
) => {
  const collectionRef = collection(dataBase, collectionName);
  await addDoc(collectionRef, { [documentRootKey]: newDoc });
};

export const updateNestedDocument = async <T extends object>(
  collectionName: string,
  documentRootKey: string,
  documentId: string,
  data: Partial<T>,
) => {
  const nestedUpdates = Object.entries(data).reduce<UpdateData<DocumentData>>(
    (acc, [key, value]) => {
      if (value === undefined) {
        return acc;
      }

      acc[`${documentRootKey}.${key}`] =
        value as UpdateData<DocumentData>[string];
      return acc;
    },
    {},
  );

  if (!Object.keys(nestedUpdates).length) {
    return;
  }

  try {
    const docRef = doc(dataBase, collectionName, documentId);
    await updateDoc(docRef, nestedUpdates);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

export const removeDocumentFromCollection = async (
  collectionName: string,
  documentId: string,
) => {
  try {
    await deleteDoc(doc(dataBase, collectionName, documentId));
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};
