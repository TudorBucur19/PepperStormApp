import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import useUploadFiles from "src/hooks/useUploadFiles";
import { AddPhotoAlternateOutlinedIcon } from "src/components/icons";
import ImagePreview from "src/components/common/ImagePreview";
import { ImageURL } from "src/types/recipes";
import { IFileUploadField } from "src/types/components";

import { fileUploadFieldStyles as styles } from "src/components/styles/recipeForm.styles";

const FileUploadField = ({
  fileCollectionName,
  formFieldName,
  allowMultiple = true,
}: IFileUploadField) => {
  const { setValue, watch } = useFormContext();
  const filesData = watch(formFieldName) || [];
  const { handleFileChange, uploadedFilesData } =
    useUploadFiles(fileCollectionName);

  useEffect(() => {
    if (uploadedFilesData && uploadedFilesData.length > 0) {
      const urlData = uploadedFilesData.map((file) => ({
        name: file.name,
        url: file.url,
      }));
      const newFilesData = [...filesData, ...urlData];
      setValue(formFieldName, newFilesData);
    }
  }, [uploadedFilesData]);

  return (
    <Stack spacing={1}>
      <Button variant="outlined" component="label">
        <AddPhotoAlternateOutlinedIcon />
        Adaugă imagini
        <input
          hidden
          type="file"
          accept="image/*"
          multiple={allowMultiple}
          onChange={(e) => handleFileChange(e)} // FileList
        />
      </Button>
      <Box sx={styles.imagesContainer}>
        {filesData.length > 0 &&
          filesData.map((file: ImageURL, index: number, files: ImageURL[]) => (
            <ImagePreview
              key={file.name}
              imageSrc={file.url}
              title={file.name}
              index={index}
              files={files}
              collectionName={fileCollectionName}
              showFavIcon={allowMultiple}
            />
          ))}
      </Box>
    </Stack>
  );
};
export default FileUploadField;
