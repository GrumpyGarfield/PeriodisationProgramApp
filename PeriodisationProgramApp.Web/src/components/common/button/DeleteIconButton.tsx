import { IconButton, IconButtonProps } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export function DeleteIconButton({ ...props }: IconButtonProps) {
  return (
    <IconButton {...props}>
      <DeleteIcon fontSize={props.size} />
    </IconButton>
  );
}
