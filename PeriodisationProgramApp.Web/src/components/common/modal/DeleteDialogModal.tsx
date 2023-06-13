import { Button, Stack, Typography } from "@mui/material";
import { BasicModal } from "./BasicModal";

type Props = {
  entityName: string;
  isOpen: boolean;
  handleClose: () => void;
  handleDelete: () => void;
};

export function DeleteDialogModal({
  entityName,
  isOpen,
  handleClose,
  handleDelete,
}: Props) {
  return (
    <BasicModal
      title={`Delete this ${entityName} forever?`}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <Typography variant="body1">
        You are about to destroy this {entityName} forever. This cannot be
        undone. Are you sure?
      </Typography>
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{ pt: 3 }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          sx={{ width: 150 }}
        >
          Delete
        </Button>
        <Button variant="contained" onClick={handleClose} sx={{ width: 150 }}>
          Cancel
        </Button>
      </Stack>
    </BasicModal>
  );
}
