import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Box, Button, Stack } from "@mui/material";

import useUploadFiles from "src/hooks/useUploadFiles";
import { PHOTOS_COLLECTION_NAME } from "src/constants/appConfigValues";
import { AddPhotoAlternateOutlinedIcon } from "src/components/icons";
import ImagePreview from "src/components/common/ImagePreview";
import { ImageURL } from "src/types/recipes";

const styles = {
  imagesContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
  },
};

// interface IFileUploadField {
//   defaultValues?: ImageURL[];
// }

const FileUploadField = () => {
  const { setValue, getValues, watch } = useFormContext();
  // const [filesData, setFilesData] = useState<ImageURL[]>(watch("imageURL"));
  const filesData = watch("imageURL") || [];
  const { handleFileChange, uploadedFilesData } = useUploadFiles(
    PHOTOS_COLLECTION_NAME,
  );
  console.log("images", getValues("imageURL"));

  useEffect(() => {
    // const defaultValues: ImageURL[] = getValues("imageURL") || [];
    // if (defaultValues && defaultValues.length > 0) {
    //   setFilesData(defaultValues);
    // }
    if (uploadedFilesData && uploadedFilesData.length > 0) {
      const urlData = uploadedFilesData.map((file) => ({
        name: file.name,
        url: file.url,
      }));
      const newFilesData = [...filesData, ...urlData];
      console.log("new-FILESDATA", newFilesData);

      // setFilesData(newFilesData);
      setValue("imageURL", newFilesData);
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
          multiple
          onChange={(e) => handleFileChange(e)} // FileList
        />
      </Button>
      <Box sx={styles.imagesContainer}>
        {filesData.length > 0 &&
          filesData.map((file: ImageURL, index: number) => (
            <ImagePreview
              key={file.name}
              imageSrc={file.url}
              title={file.name}
              index={index}
            />
          ))}
      </Box>
    </Stack>
  );
};
export default FileUploadField;
