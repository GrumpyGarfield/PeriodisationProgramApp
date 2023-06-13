import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CircularProgress } from "@mui/material";
import useLoader from "../../../context/loaderContext/useLoader";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export function LoaderModal() {
  const { isLoaderOpen: isOpen } = useLoader();

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CircularProgress />
      </Box>
    </Modal>
  );
}
