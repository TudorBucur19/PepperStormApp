import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import PsButton from "src/components/common/PsButton";
import { AddTaskIcon } from "src/components/icons";
import { listItemSchema } from "src/schemas/todoListSchemas";
import { IListItemForm } from "src/types/components";
import { ListItemFormValues } from "src/types/toDoList";

import { listItemFormStyles as styles } from "src/components/styles/toDoList.styles";

const ListItemForm = ({ onAddItem }: IListItemForm) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ListItemFormValues>({
    resolver: zodResolver(listItemSchema),
    defaultValues: {
      listItem: "",
    },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<ListItemFormValues> = async ({ listItem }) => {
    onAddItem(listItem.trim());
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Box sx={styles.form}>
        <TextField
          label="Adaugă un to-do"
          fullWidth
          sx={styles.input}
          error={!!errors.listItem}
          helperText={
            typeof errors.listItem?.message === "string"
              ? errors.listItem.message
              : undefined
          }
          {...register("listItem")}
          slotProps={{
            formHelperText: { sx: { marginLeft: 0 } },
          }}
        />
        <PsButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          startIcon={<AddTaskIcon />}
          sx={{ minWidth: { xs: "100%", sm: "fit-content" } }}
        ></PsButton>
      </Box>
    </form>
  );
};

export default ListItemForm;
