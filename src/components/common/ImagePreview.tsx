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
import { PHOTOS_COLLECTION_NAME } from "src/constants/appConfigValues";
import { IImagePreview } from "src/types/components";

const ImagePreview = ({ imageSrc, title, index }: IImagePreview) => {
  const { deleteFileHandler, changeMainImageHandler } = useUploadFiles(
    PHOTOS_COLLECTION_NAME,
  );
  const favIcon = index === 0 ? <FavoriteIcon /> : <FavoriteBorderIcon />;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={imageSrc} alt={title} />
      </CardActionArea>
      <CardActions>
        <PsButton
          variant="basic"
          color="transparent"
          onClick={() => deleteFileHandler(title)}
        >
          <DeleteOutlinedIcon color="error" />
        </PsButton>
        <PsButton
          variant="basic"
          color="transparent"
          onClick={() => changeMainImageHandler(index)}
        >
          {favIcon}
        </PsButton>
      </CardActions>
    </Card>
  );
};

export default ImagePreview;
