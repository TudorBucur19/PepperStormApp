import { useQueryClient } from "@tanstack/react-query";
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
import { DeleteOutlinedIcon, EditNoteIcon } from "src/components/icons";
import DialogBox from "src/components/common/DialogBox";
import {
  IDEAS_PHOTOS_COLLECTION_NAME,
  QUERY_KEYS,
} from "src/constants/appConfigValues";
import useIdeasDatabase from "src/hooks/useIdeasDatabase";
import TentIcon from "src/components/icons/TentIcon";
import { useStore } from "src/store/rootStore";
import useUploadFiles from "src/hooks/useUploadFiles";
import { useAuthContext } from "src/hooks/AuthContext";
import { IDBRecipeIdea } from "src/types/ideas";

import { ideaItemStyles } from "src/components/styles/ideas.styles";

const IdeaItem = ({ ideaItem }: IIdeaItem) => {
  const queryClient = useQueryClient();
  const { checkOwnership } = useAuthContext();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const isEditingIdea = useStore((state) => state.editingIdea);
  const setEditingIdea = useStore((state) => state.setEditingIdea);
  const { removeIdea: removeIdeaFromDatabase } = useIdeasDatabase();
  const { deleteFileHandler } = useUploadFiles(IDEAS_PHOTOS_COLLECTION_NAME);
  const idea = ideaItem.idea;
  const isOwner = checkOwnership(idea.author.userID);
  const isEditMode = isEditingIdea?.id === ideaItem.id;

  const deleteIdeaHandler = async (docId: string) => {
    await removeIdeaFromDatabase(docId);
    queryClient.setQueryData<IDBRecipeIdea[]>(
      QUERY_KEYS.IDEAS_QUERY_KEY,
      (ideas = []) => ideas.filter((ideaEntry) => ideaEntry.id !== docId),
    );
    deleteFileHandler(idea.imageURL[0].name); //delete the associated image from storage
    setIsDeleteDialogOpen(false);
  };

  const {
    container,
    cardMedia,
    cardBody,
    details,
    titleContainer,
    campingIcon,
    title,
    description,
    actions,
  } = ideaItemStyles(isEditMode);

  return (
    <>
      <Card sx={container} raised={isEditMode}>
        <CardMedia
          component="img"
          image={idea.imageURL[0]?.url || noPhotoPlaceholder}
          alt={idea.title}
          sx={cardMedia}
        />
        <Box sx={cardBody}>
          <CardContent sx={details}>
            <Box sx={titleContainer}>
              {idea.campingFriendly && (
                <Box sx={campingIcon}>
                  <TentIcon />
                </Box>
              )}
              <Typography sx={title}>{idea.title}</Typography>
            </Box>
            <Typography sx={description}>{idea.description}</Typography>
          </CardContent>
          {isOwner && (
            <CardActions sx={actions}>
              <PsButton
                variant="basic"
                color="transparent"
                startIcon={<EditNoteIcon />}
                onClick={() => setEditingIdea(ideaItem)}
                ariaLabel="Editează ideea"
              />
              <PsButton
                variant="basic"
                color="transparent"
                startIcon={<DeleteOutlinedIcon />}
                onClick={() => setIsDeleteDialogOpen(true)}
                sx={{ color: "error.main" }}
                ariaLabel="Șterge ideea"
              />
            </CardActions>
          )}
        </Box>
      </Card>
      <DialogBox
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Confirmare ștergere"
        confirmLabel="Șterge"
        cancelLabel="Anulează"
        confirmAction={() => deleteIdeaHandler(ideaItem.id)}
      >
        Ești sigur că vrei să ștergi această idee?
      </DialogBox>
    </>
  );
};

export default IdeaItem;
