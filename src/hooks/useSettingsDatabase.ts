import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { dataBase } from "src/api/firebase";
import {
  QUERY_KEYS,
  SETTINGS_COLLECTION_NAME,
} from "src/constants/appConfigValues";
import { useStore } from "src/store/rootStore";
import { IDBAppSettings } from "src/types/recipes";

const useSettingsDatabase = () => {
  const setAppSettings = useStore((state) => state.setAppSettings);
  const queryClient = useQueryClient();

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
    return settings;
  };

  const appSettingsQuery = useQuery<IDBAppSettings>({
    queryKey: QUERY_KEYS.APP_SETTINGS_QUERY_KEY,
    queryFn: getSettingsCollectionData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  const updateSettingsCollectionData = async (
    settingKey: string,
    value: string,
  ) => {
    const docRef = doc(dataBase, SETTINGS_COLLECTION_NAME, settingKey);

    try {
      await updateDoc(docRef, { values: arrayUnion(value) });
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.APP_SETTINGS_QUERY_KEY,
      });
      console.log("Settings successfully updated!");
    } catch (error) {
      console.error("Error updating settings: ", error);
      throw error;
    }
  };

  return {
    appSettingsQuery,
    getSettingsCollectionData,
    updateSettingsCollectionData,
  };
};

export default useSettingsDatabase;
