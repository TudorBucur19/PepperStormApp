import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { reorderList } from "src/utils/helpers";

type UploadedFileData = {
  url: string;
  path: string;
  name: string;
  type: string;
  size: number;
};
// interface UseUploadFilesOptions {
//   onImageUrlChange?: (url: string | null) => void;
// }

const useUploadFiles = (fileCollectionName: string) => {
  const storage = getStorage();
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [uploadedFilesData, setUploadedFilesData] = useState<
    UploadedFileData[]
  >([]);

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

  const uploadFilesHandler = async () => {
    const uploads = filesToUpload.map(async (file) => {
      const path = `${fileCollectionName}/${file.name}`;
      const storageRef = ref(storage, path);

      await uploadBytes(storageRef, file); // simple upload :contentReference[oaicite:2]{index=2}
      const url = await getDownloadURL(storageRef); // url :contentReference[oaicite:3]{index=3}

      return { url, path, name: file.name, type: file.type, size: file.size };
    });

    return Promise.all(uploads);
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
        // Update form state for imageURL
        // if (options && typeof options.onImageUrlChange === "function") {
        //   const newMainUrl =
        //     updatedFiles.length > 0 ? updatedFiles[0].url : null;
        //   options.onImageUrlChange(newMainUrl);
        // }
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

  const changeMainImageHandler = (imageIndex: number) => {
    const reorderedFiles = reorderList(uploadedFilesData, imageIndex);
    setUploadedFilesData(reorderedFiles);
  };

  return {
    handleFileChange,
    uploadedFilesData,
    deleteFileHandler,
    changeMainImageHandler,
  };
};

export default useUploadFiles;
