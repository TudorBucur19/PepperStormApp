import Box from "@mui/material/Box";

import PageTitle from "src/components/common/PageTitle";
import ListItemForm from "src/components/ToDoList/ListItemForm";
import ListItem from "src/components/ToDoList/ListItem";
import { IToDoListItem } from "src/types/storeSlices";

import { itemListStyles as styles } from "src/components/styles/toDoList.styles";

const ItemsList = ({
  items,
  onAddItem,
  onDeleteItem,
  startIcon,
}: {
  items: IToDoListItem[];
  onAddItem: (item: string) => void;
  onDeleteItem: (id: string) => void;
  startIcon?: React.ReactNode;
}) => {
  return (
    <Box sx={styles.pageContainer}>
      <PageTitle>Ce facem zilele următoare</PageTitle>
      <Box sx={styles.listcontainer}>
        <Box>
          {items.map((item, index) => (
            <ListItem
              key={item.id}
              item={item.item}
              startIcon={startIcon}
              isLast={index === items.length - 1}
              onDelete={() => onDeleteItem(item.id)}
            />
          ))}
        </Box>
        <ListItemForm onAddItem={onAddItem} />
      </Box>
    </Box>
  );
};

export default ItemsList;
