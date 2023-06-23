import { BasicModal } from "./BasicModal";
import { Button, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export function SingInOrSignUpModal({ isOpen, handleClose }: Props) {
  return (
    <BasicModal title={`Sign In`} isOpen={isOpen} handleClose={handleClose}>
      <Typography variant="body1">
        Please{" "}
        <Link component={RouterLink} to={"/signin"}>
          sign in
        </Link>{" "}
        or{" "}
        <Link component={RouterLink} to={"/signup"}>
          sign up
        </Link>{" "}
        to be able to create, save and edit training programs and exercises.
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
          href={"/signin"}
          sx={{ width: 150 }}
        >
          Sign In
        </Button>
      </Stack>
    </BasicModal>
  );
}
