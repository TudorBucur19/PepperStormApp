import { useState } from "react";
import Box from "@mui/material/Box";

import PsButton from "src/components/common/PsButton";
import { DeleteOutlinedIcon } from "src/components/icons";
import { capitalizeString } from "src/utils/helpers";
import DialogBox from "src/components/common/DialogBox";
import { IListItem } from "src/types/components";

import { itemListStyles as styles } from "../styles/toDoList.styles";

const ListItem = ({ item, isLast, startIcon, onDelete }: IListItem) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const deleteHandler = () => {
    onDelete(item);
    setIsDeleteDialogOpen(false);
  };
  const { listItem, lastListItem } = styles;

  return (
    <>
      <Box sx={isLast ? { ...listItem, ...lastListItem } : { ...listItem }}>
        {startIcon}
        {capitalizeString(item)}
        <PsButton
          variant="basic"
          color="transparent"
          startIcon={<DeleteOutlinedIcon />}
          onClick={() => setIsDeleteDialogOpen(true)}
          sx={{ color: "error.main" }}
          ariaLabel={`Șterge elementul ${capitalizeString(item)} din listă`}
        />
      </Box>
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
    </>
  );
};

export default ListItem;
