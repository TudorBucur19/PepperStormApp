import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ItemsList from "src/components/ToDoList/ItemsList";
import GenericContainer from "src/components/common/GenericContainer";
import LoadingPlaceholder from "src/components/common/LoadingPlaceholder";
import ErrorFallback from "src/components/common/ErrorFallback";
import { PushPinIcon } from "src/components/icons";
import useTodoListDatabase from "src/hooks/useTodoListDatabase";
import { IToDoListItem } from "src/types/storeSlices";
import { QUERY_KEYS } from "src/constants/appConfigValues";

const TodoListPage = () => {
  const queryClient = useQueryClient();
  const { addItemToList, getToDoList, removeItemFromList, shareToDoListWith } =
    useTodoListDatabase();

  const {
    data: toDoList = [],
    isLoading,
    isError,
  } = useQuery<IToDoListItem[]>({
    queryKey: QUERY_KEYS.TODO_LIST_QUERY_KEY,
    queryFn: async () => (await getToDoList()) ?? [],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  const addItemMutation = useMutation({
    mutationFn: addItemToList,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.TODO_LIST_QUERY_KEY,
      });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: removeItemFromList,
    onSuccess: (_, deletedItemId) => {
      queryClient.setQueryData<IToDoListItem[]>(
        QUERY_KEYS.TODO_LIST_QUERY_KEY,
        (items = []) => items.filter((item) => item.id !== deletedItemId),
      );
    },
  });

  const shareListMutation = useMutation({
    mutationFn: shareToDoListWith,
  });

  const handleAddItem = async (item: string) => {
    await addItemMutation.mutateAsync(item);
  };

  const handleDeleteItem = async (id: string) => {
    await deleteItemMutation.mutateAsync(id);
  };

  const handleShareList = async (email: string) => {
    await shareListMutation.mutateAsync(email);
  };

  if (isLoading) return <LoadingPlaceholder />;
  if (isError) {
    return <ErrorFallback errorMessage="Error fetching to do list" />;
  }

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
