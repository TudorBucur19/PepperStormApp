import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import PsButton from "src/components/common/PsButton";
import { ShareListFormValues } from "src/types/toDoList";
import { shareListSchema } from "src/schemas/todoListSchemas";
import { IShareListForm } from "src/types/components";
import { SendIcon } from "src/components/icons";

import { itemListStyles as styles } from "src/components/styles/toDoList.styles";

const ShareListForm = ({ onShareList }: IShareListForm) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShareListFormValues>({
    resolver: zodResolver(shareListSchema),
    defaultValues: {
      shareEmail: "",
    },
    mode: "onSubmit",
  });

  const onShareSubmit: SubmitHandler<ShareListFormValues> = async ({
    shareEmail,
  }) => {
    await onShareList(shareEmail.trim().toLowerCase());
    reset();
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onShareSubmit)}
      sx={styles.shareForm}
    >
      <TextField
        label="Email pentru partajare"
        type="email"
        fullWidth
        error={!!errors.shareEmail}
        helperText={
          typeof errors.shareEmail?.message === "string"
            ? errors.shareEmail.message
            : undefined
        }
        {...register("shareEmail")}
        slotProps={{
          formHelperText: { sx: { marginLeft: 0 } },
        }}
      />
      <Box sx={styles.shareActions}>
        <PsButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          startIcon={<SendIcon />}
          sx={{ minWidth: { xs: "100%", sm: "fit-content" } }}
        ></PsButton>
      </Box>
    </Box>
  );
};

export default ShareListForm;
