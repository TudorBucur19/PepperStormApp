import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { useStore } from "src/store/rootStore";
import { UploadedFileData } from "src/types/dataBase";

const useUploadFiles = (fileCollectionName: string) => {
  const storage = getStorage();
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [uploadedFilesData, setUploadedFilesData] = useState<
    UploadedFileData[]
  >([]);
  const setApiCallStatus = useStore((state) => state.setApiCallStatus);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilesToUpload(e.target.files ? Array.from(e.target.files) : []);
  };

  useEffect(() => {
    const upload = async () => {
      if (filesToUpload.length) {
        const fileData = await uploadFilesHandler();
        setUploadedFilesData(fileData);
      }
    };
    upload();
  }, [filesToUpload]);

  const uploadFilesHandler = async (): Promise<UploadedFileData[]> => {
    setApiCallStatus(true);
    try {
      const uploads = filesToUpload.map(async (file) => {
        const path = `${fileCollectionName}/${file.name}`;
        const storageRef = ref(storage, path);

        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        return { url, path, name: file.name, type: file.type, size: file.size };
      });

      return await Promise.all(uploads);
    } catch (error) {
      console.error("Error uploading files:", error);
      return [];
    } finally {
      setApiCallStatus(false);
    }
  };

  const deleteFileHandler = async (fileName: string) => {
    const fileRef = ref(storage, `${fileCollectionName}/${fileName}`);
    deleteObject(fileRef)
      .then(() => {
        console.log("Image was deleted");
        const updatedFiles = uploadedFilesData.filter(
          (file) => file.name !== fileName,
        );
        setUploadedFilesData(updatedFiles);
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

  return {
    handleFileChange,
    uploadedFilesData,
    deleteFileHandler,
  };
};

export default useUploadFiles;
