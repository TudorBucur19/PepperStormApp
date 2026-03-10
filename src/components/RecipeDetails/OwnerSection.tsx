import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

import PsButton from "src/components/common/PsButton";
import { DeleteOutlinedIcon, EditNoteIcon } from "src/components/icons";
import {
  RECIPES_PHOTOS_COLLECTION_NAME,
  RECIPES_COLLECTION_NAME,
} from "src/constants/appConfigValues";
import useDatabase from "src/hooks/useDatabase";
import { IOwnerSection } from "src/types/components";
import { useAuthContext } from "src/hooks/AuthContext";
import { useStore } from "src/store/rootStore";
import DialogBox from "src/components/common/DialogBox";
import { URLS } from "src/constants/urls";
import useUploadFiles from "src/hooks/useUploadFiles";

import { ownerSectionStyles as styles } from "src/components/styles/recipeDetails.styles";

const OwnerSection = ({ owner, documentId, imageURL }: IOwnerSection) => {
  const { removeDocumentFromCollection } = useDatabase(RECIPES_COLLECTION_NAME);
  const { deleteFileHandler } = useUploadFiles(RECIPES_PHOTOS_COLLECTION_NAME);
  const { checkOwnership } = useAuthContext();
  const setModalOpen = useStore((state) => state.setModalOpen);
  const navigate = useNavigate();
  const editRecipeHandler = () => {
    navigate(URLS.EDIT_RECIPE(documentId));
  };
  const deleteRecipeHandler = () => {
    removeDocumentFromCollection(RECIPES_COLLECTION_NAME, documentId);
    if (imageURL && imageURL.length > 0) {
      imageURL.forEach((image) => {
        deleteFileHandler(image.name);
      });
    }
    setModalOpen(false);
    navigate(URLS.HOME);
  };
  const haveFullAccess = checkOwnership(owner.userID);

  return (
    <Box sx={styles.actionsContainer}>
      <Typography sx={styles.ownerLabel}>
        {`By ${owner.displayName}`}
      </Typography>
      {haveFullAccess && (
        <>
          <PsButton
            variant="outlined"
            color="transparent"
            ariaLabel="Modifică rețeta"
            onClick={editRecipeHandler}
          >
            <EditNoteIcon />
          </PsButton>
          <PsButton
            variant="contained"
            color="danger"
            ariaLabel="Șterge rețeta"
            onClick={() => setModalOpen(true)}
          >
            <DeleteOutlinedIcon />
          </PsButton>
        </>
      )}
      <DialogBox
        title="Confirmare ștergere"
        description="Ești sigur că vrei să ștergi această rețetă?"
        confirmLabel="Șterge"
        cancelLabel="Anulează"
        confirmAction={deleteRecipeHandler}
      />
    </Box>
  );
};

export default OwnerSection;
