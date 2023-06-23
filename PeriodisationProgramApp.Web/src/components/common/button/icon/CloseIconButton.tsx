import { IconButton, IconButtonProps } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function CloseIconButton({ ...props }: IconButtonProps) {
  return (
    <IconButton {...props}>
      <CloseIcon fontSize={props.size} />
    </IconButton>
  );
}
