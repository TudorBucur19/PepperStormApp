import { useEffect } from "react";

import ItemsList from "src/components/ToDoList/ItemsList";
import GenericContainer from "src/components/common/GenericContainer";
import { PushPinIcon } from "src/components/icons";
import useTodoListDatabase from "src/hooks/useTodoListDatabase";
import { useStore } from "src/store/rootStore";

const TodoListPage = () => {
  const toDoList = useStore((s) => s.toDoList);
  const setToDoList = useStore((s) => s.setToDoList);
  const removeItemFromStore = useStore((s) => s.removeItemFromList);
  const { addItemToList, getToDoList, removeItemFromList, shareToDoListWith } =
    useTodoListDatabase();

  useEffect(() => {
    const loadToDoList = async () => {
      const list = await getToDoList();
      setToDoList(list);
    };

    void loadToDoList();
  }, []);

  const handleAddItem = async (item: string) => {
    await addItemToList(item);
    const list = await getToDoList();
    setToDoList(list);
  };

  const handleDeleteItem = async (id: string) => {
    await removeItemFromList(id);
    removeItemFromStore(id);
  };

  const handleShareList = async (email: string) => {
    await shareToDoListWith(email);
  };

  return (
    <GenericContainer>
      <ItemsList
        items={toDoList}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        onShareList={handleShareList}
        startIcon={<PushPinIcon color="primary" />}
      />
    </GenericContainer>
  );
};

export default TodoListPage;
