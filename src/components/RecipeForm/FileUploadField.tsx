import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button, Stack } from "@mui/material";

import useUploadFiles from "src/hooks/useUploadFiles";
import { PHOTOS_COLLECTION_NAME } from "src/constants/appConfigValues";
import { AddPhotoAlternateOutlinedIcon } from "src/components/icons";

const FileUploadField = () => {
  const { setValue } = useFormContext();
  const { handleFileChange, uploadedFilesData } = useUploadFiles(
    PHOTOS_COLLECTION_NAME
  );

  useEffect(() => {
    if (uploadedFilesData && uploadedFilesData.length > 0) {
      const urlData = uploadedFilesData.map((file) => ({
        name: file.name,
        url: file.url,
      }));
      setValue("imageURL", urlData);
    }
  }, [uploadedFilesData, setValue]);
  return (
    <Stack spacing={1}>
      <Button variant="outlined" component="label">
        <AddPhotoAlternateOutlinedIcon />
        Adaugă imagini
        <input
          hidden
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileChange(e)} // FileList
        />
      </Button>
    </Stack>
  );
};
export default FileUploadField;
