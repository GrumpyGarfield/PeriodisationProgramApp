import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { PropsWithChildren } from "react";
import { CloseIconButton } from "../button/icon/CloseIconButton";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type Props = {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
} & BoxProps &
  PropsWithChildren;

export function BasicModal({
  title,
  isOpen,
  handleClose,
  children,
  ...props
}: Props) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} {...props}>
        <CloseIconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 0, right: 0, m: 1 }}
        />
        <Typography id="modal-modal-title" variant="h5">
          {title}
        </Typography>
        <Box sx={{ pt: 3 }}>{children}</Box>
      </Box>
    </Modal>
  );
}
