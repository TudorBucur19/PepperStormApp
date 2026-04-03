import {
  arrayUnion,
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { auth, dataBase } from "src/api/firebase";
import { TO_DO_LIST_COLLECTION_NAME } from "src/constants/appConfigValues";
import { IToDoListItem } from "src/types/storeSlices";

const useTodoListDatabase = () => {
  const mapItemsFromDocument = (
    ownerId: string,
    rawItems: unknown,
    currentUserId: string,
  ): IToDoListItem[] => {
    if (!rawItems || typeof rawItems !== "object") {
      return [];
    }

    return (
      Array.isArray(rawItems)
        ? rawItems.map((rawItem) => [rawItem?.itemId, rawItem?.item])
        : Object.entries(rawItems)
    )
      .map(([itemId, item]) => {
        if (typeof itemId !== "string" || typeof item !== "string") {
          return null;
        }

        return {
          id: itemId,
          item,
          ownerId,
          isOwnedByCurrentUser: ownerId === currentUserId,
        } as IToDoListItem;
      })
      .filter((listItem): listItem is IToDoListItem => listItem !== null);
  };

  const addItemToList = async (item: string) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      throw new Error("User must be logged in to add list items.");
    }

    const collectionRef = collection(dataBase, TO_DO_LIST_COLLECTION_NAME);
    const userDocRef = doc(collectionRef, userId);
    const itemId = doc(collectionRef).id;

    await setDoc(
      userDocRef,
      {
        items: {
          [itemId]: item,
        },
      },
      { merge: true },
    );
  };

  const getToDoList = async () => {
    const userId = auth.currentUser?.uid;
    const userEmail = auth.currentUser?.email?.trim().toLowerCase();

    if (!userId) {
      return [];
    }

    const userDocRef = doc(dataBase, TO_DO_LIST_COLLECTION_NAME, userId);
    const sharedListsQuery = userEmail
      ? query(
          collection(dataBase, TO_DO_LIST_COLLECTION_NAME),
          where("sharedWith", "array-contains", userEmail),
        )
      : null;

    const [userDocSnapshot, sharedListsSnapshot] = await Promise.all([
      getDoc(userDocRef),
      sharedListsQuery ? getDocs(sharedListsQuery) : Promise.resolve(null),
    ]);

    const ownListItems = mapItemsFromDocument(
      userId,
      userDocSnapshot.data()?.items,
      userId,
    );

    const sharedListItems = sharedListsSnapshot
      ? sharedListsSnapshot.docs
          .filter((sharedDoc) => sharedDoc.id !== userId)
          .flatMap((sharedDoc) =>
            mapItemsFromDocument(sharedDoc.id, sharedDoc.data()?.items, userId),
          )
      : [];

    const list = [...ownListItems, ...sharedListItems].sort((a, b) =>
      a.item.localeCompare(b.item),
    );

    if (list.length === 0) {
      return [];
    }

    return list;
  };

  const removeItemFromList = async (itemId: string) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      throw new Error("User must be logged in to remove list items.");
    }

    const userDocRef = doc(dataBase, TO_DO_LIST_COLLECTION_NAME, userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      return;
    }

    await updateDoc(userDocRef, {
      [`items.${itemId}`]: deleteField(),
    });
  };

  const shareToDoListWith = async (email: string) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      throw new Error("User must be logged in to share list items.");
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      throw new Error("A valid email is required to share the list.");
    }

    const userDocRef = doc(dataBase, TO_DO_LIST_COLLECTION_NAME, userId);

    await setDoc(
      userDocRef,
      {
        sharedWith: arrayUnion(normalizedEmail),
      },
      { merge: true },
    );
  };

  return {
    addItemToList,
    getToDoList,
    removeItemFromList,
    shareToDoListWith,
  };
};

export default useTodoListDatabase;
