import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";

type UploadedFileData = {
  url: string;
  path: string;
  name: string;
  type: string;
  size: number;
};
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

  return { handleFileChange, uploadedFilesData };
};

export default useUploadFiles;
