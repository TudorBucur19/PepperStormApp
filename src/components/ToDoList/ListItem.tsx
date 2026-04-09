import { useState } from "react";
import Box from "@mui/material/Box";

import PsButton from "src/components/common/PsButton";
import { HighlightOffIcon } from "src/components/icons";
import { capitalizeString } from "src/utils/helpers";
import DialogBox from "src/components/common/DialogBox";
import { IListItem } from "src/types/components";

import { itemListStyles as styles } from "../styles/toDoList.styles";

const ListItem = ({
  item,
  isLast,
  startIcon,
  canDelete = true,
  onDelete,
}: IListItem) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const deleteHandler = () => {
    onDelete(item);
    setIsDeleteDialogOpen(false);
  };
  const { listItem, listItemAction, lastListItem } = styles;

  return (
    <>
      <Box sx={isLast ? { ...listItem, ...lastListItem } : { ...listItem }}>
        {startIcon}
        {capitalizeString(item)}
        <Box sx={listItemAction}>
          <PsButton
            variant="basic"
            color="transparent"
            startIcon={<HighlightOffIcon />}
            onClick={() => setIsDeleteDialogOpen(true)}
            sx={{ color: "error.main", "&:disabled": { color: "#737373" } }}
            ariaLabel={`Șterge elementul ${capitalizeString(item)} din listă`}
            disabled={!canDelete}
          />
        </Box>
      </Box>
      {canDelete && (
        <DialogBox
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          title="Confirmare ștergere"
          confirmLabel="Șterge"
          cancelLabel="Anulează"
          confirmAction={deleteHandler}
        >
          Ești sigur că vrei să ștergi acest element?
        </DialogBox>
      )}
    </>
  );
};

export default ListItem;
