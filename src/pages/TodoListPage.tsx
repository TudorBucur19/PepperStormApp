import { useEffect } from "react";

import ItemsList from "src/components/ToDoList/ItemsList";
import GenericContainer from "src/components/common/GenericContainer";
import { PushPinIcon } from "src/components/icons";
import { TO_DO_LIST_COLLECTION_NAME } from "src/constants/appConfigValues";
import useDatabase from "src/hooks/useDatabase";
import { useStore } from "src/store/rootStore";

const TodoListPage = () => {
  const toDoList = useStore((s) => s.toDoList);
  const setToDoList = useStore((s) => s.setToDoList);
  const removeItemFromStore = useStore((s) => s.removeItemFromList);
  const { addItemToList, getToDoList, removeItemFromList } =
    useDatabase(TO_DO_LIST_COLLECTION_NAME);

  useEffect(() => {
    const loadToDoList = async () => {
      const list = await getToDoList();
      setToDoList(list);
    };

    void loadToDoList();
  }, []);

  const handleAddItem = (item: string) => {
    void (async () => {
      await addItemToList(item);
      const list = await getToDoList();
      setToDoList(list);
    })();
  };

  const handleDeleteItem = (id: string) => {
    void (async () => {
      await removeItemFromList(id);
      removeItemFromStore(id);
    })();
  };

  return (
    <GenericContainer>
      <ItemsList
        items={toDoList}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        startIcon={<PushPinIcon color="primary" />}
      />
    </GenericContainer>
  );
};

export default TodoListPage;
