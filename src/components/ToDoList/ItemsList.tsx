import { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

import PsButton from "src/components/common/PsButton";
import PageTitle from "src/components/common/PageTitle";
import ListItemForm from "src/components/ToDoList/ListItemForm";
import ListItem from "src/components/ToDoList/ListItem";
import ShareListForm from "src/components/ToDoList/ShareListForm";
import { AddIcon, ShareIcon } from "src/components/icons";
import { IItemsList } from "src/types/components";
import { ActiveForm } from "src/types/toDoList";

import { itemListStyles as styles } from "src/components/styles/toDoList.styles";

const ItemsList = ({
  items,
  onAddItem,
  onDeleteItem,
  onShareList,
  startIcon,
}: IItemsList) => {
  const [activeForm, setActiveForm] = useState<ActiveForm>(null);

  const toggleForm = (form: Exclude<ActiveForm, null>) => {
    setActiveForm((currentForm) => (currentForm === form ? null : form));
  };

  return (
    <Box sx={styles.pageContainer}>
      <PageTitle>Ce facem în zilele următoare</PageTitle>
      <Box sx={styles.listcontainer}>
        {items.length > 0 ? (
          <Box>
            {items.map((item, index) => (
              <ListItem
                key={item.id}
                item={item.item}
                canDelete={item.isOwnedByCurrentUser}
                startIcon={startIcon}
                isLast={index === items.length - 1}
                onDelete={() => onDeleteItem(item.id)}
              />
            ))}
          </Box>
        ) : (
          <Box>Încă nu ai planificat nimic</Box>
        )}
        <Box sx={styles.expandableSection}>
          <Box sx={styles.expandableTriggers}>
            <PsButton
              variant="basic"
              color="transparent"
              startIcon={<ShareIcon color="primary" />}
              onClick={() => toggleForm("share")}
              ariaLabel={
                activeForm === "share"
                  ? "Ascunde formularul de partajare"
                  : "Partajează lista cu altcineva"
              }
              sx={styles.expandableTrigger}
            />
            <PsButton
              variant="basic"
              color="transparent"
              startIcon={<AddIcon />}
              onClick={() => toggleForm("add")}
              ariaLabel={
                activeForm === "add"
                  ? "Ascunde formularul de adăugare"
                  : "Adaugă un element în listă"
              }
              sx={styles.expandableTrigger}
            />
          </Box>
          <Collapse in={activeForm !== null} timeout="auto" unmountOnExit>
            <Box sx={styles.expandableContent}>
              {activeForm === "add" ? (
                <ListItemForm onAddItem={onAddItem} />
              ) : (
                <ShareListForm onShareList={onShareList} />
              )}
            </Box>
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemsList;
