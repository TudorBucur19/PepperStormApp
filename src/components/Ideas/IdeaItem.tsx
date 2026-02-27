import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import noPhotoPlaceholder from "src/assets/noPhotoPlaceholder.png";
import { IIdeaItem } from "src/types/components";
import PsButton from "src/components/common/PsButton";
import { DeleteOutlinedIcon } from "src/components/icons";
import DialogBox from "src/components/common/DialogBox";
import {
  IDEAS_COLLECTION_NAME,
  IDEAS_PHOTOS_COLLECTION_NAME,
} from "src/constants/appConfigValues";
import useDatabase from "src/hooks/useDatabase";
import TentIcon from "src/components/icons/TentIcon";
import { useStore } from "src/store/rootStore";
import useUploadFiles from "src/hooks/useUploadFiles";

import { ideaItemStyles as styles } from "src/components/styles/ideas.styles";

const IdeaItem = ({ ideaItem }: IIdeaItem) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const removeIdea = useStore((state) => state.removeIdea);
  const { removeDocumentFromCollection } = useDatabase(IDEAS_COLLECTION_NAME);
  const { deleteFileHandler } = useUploadFiles(IDEAS_PHOTOS_COLLECTION_NAME);
  const idea = ideaItem.idea;

  const deleteIdeaHandler = async (docId: string) => {
    await removeDocumentFromCollection(IDEAS_COLLECTION_NAME, docId);
    removeIdea(docId); //efficiently updates the UI after an item is deleted from the database
    deleteFileHandler(idea.imageURL[0].name); //delete the associated image from storage
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Card sx={styles.container}>
        <CardMedia
          component="img"
          image={idea.imageURL[0]?.url || noPhotoPlaceholder}
          alt={idea.title}
          sx={styles.cardMedia}
        />
        <Box sx={styles.cardBody}>
          <CardContent sx={styles.details}>
            <Typography sx={styles.title}>{idea.title}</Typography>
            <Typography sx={styles.description}>{idea.description}</Typography>
          </CardContent>
          <CardActions sx={styles.actions}>
            {idea.campingFriendly && <TentIcon />}
            <PsButton
              variant="basic"
              color="transparent"
              startIcon={<DeleteOutlinedIcon />}
              onClick={() => setIsDeleteDialogOpen(true)}
              sx={{ color: "error.main", marginLeft: "auto" }}
              ariaLabel="Șterge ideea"
            />
          </CardActions>
        </Box>
      </Card>
      <DialogBox
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Confirmare ștergere"
        description="Ești sigur că vrei să ștergi această idee?"
        confirmLabel="Șterge"
        cancelLabel="Anulează"
        confirmAction={() => deleteIdeaHandler(ideaItem.id)}
      />
    </>
  );
};

export default IdeaItem;
