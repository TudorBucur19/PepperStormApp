import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { dataBase } from "src/api/firebase";
import { SETTINGS_COLLECTION_NAME } from "src/constants/appConfigValues";
import { useStore } from "src/store/rootStore";
import { IDBAppSettings } from "src/types/recipes";

const useSettingsDatabase = () => {
  const setAppSettings = useStore((state) => state.setAppSettings);

  const getSettingsCollectionData = async () => {
    const settingsCollection = collection(dataBase, SETTINGS_COLLECTION_NAME);
    const settingsSnapshot = await getDocs(settingsCollection);
    const settings = settingsSnapshot.docs
      .map((settingsDoc) => ({
        [settingsDoc.id]: settingsDoc.data().values,
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {}) as IDBAppSettings;

    console.log("SETTINGS FROM DB", settings);
    setAppSettings(settings);
  };

  const updateSettingsCollectionData = async (
    settingKey: string,
    value: string,
  ) => {
    const docRef = doc(dataBase, SETTINGS_COLLECTION_NAME, settingKey);

    try {
      await updateDoc(docRef, { values: arrayUnion(value) });
      console.log("Settings successfully updated!");
    } catch (error) {
      console.error("Error updating settings: ", error);
      throw error;
    }
  };

  return {
    getSettingsCollectionData,
    updateSettingsCollectionData,
  };
};

export default useSettingsDatabase;
