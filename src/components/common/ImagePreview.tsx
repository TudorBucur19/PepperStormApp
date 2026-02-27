import { useFormContext } from "react-hook-form";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

import PsButton from "src/components/common/PsButton";
import {
  DeleteOutlinedIcon,
  FavoriteBorderIcon,
  FavoriteIcon,
} from "src/components/icons";
import useUploadFiles from "src/hooks/useUploadFiles";
import { IImagePreview } from "src/types/components";
import { ImageURL } from "src/types/recipes";

const ImagePreview = ({
  imageSrc,
  title,
  index,
  files,
  collectionName,
  showFavIcon = false,
}: IImagePreview<ImageURL[]>) => {
  const { setValue } = useFormContext();
  const { deleteFileHandler, changeMainImageHandler } =
    useUploadFiles(collectionName);

  const onDeleteFile = (fileTitle: string) => {
    deleteFileHandler(fileTitle);
    const updatedFiles = files.filter((file) => file.name !== fileTitle);
    console.log("FILTERED FILE", updatedFiles);

    setValue("imageURL", updatedFiles);
  };
  const favIcon = index === 0 ? <FavoriteIcon /> : <FavoriteBorderIcon />;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={imageSrc} alt={title} />
      </CardActionArea>
      <CardActions>
        {showFavIcon && (
          <PsButton
            variant="basic"
            color="transparent"
            onClick={() => changeMainImageHandler(index)}
          >
            {favIcon}
          </PsButton>
        )}
        <PsButton
          variant="basic"
          color="transparent"
          onClick={() => onDeleteFile(title)}
          sx={{ marginLeft: "auto" }}
        >
          <DeleteOutlinedIcon color="error" />
        </PsButton>
      </CardActions>
    </Card>
  );
};

export default ImagePreview;
