import { FormEventHandler, PropsWithChildren } from "react";
import { Container, Box, Typography, Avatar } from "@mui/material";
import {
  NavigationIconButton,
  NavigationIconButtonProps,
} from "../navigation/NavigationIconButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

type Props = {
  navigationButton: NavigationIconButtonProps;
  formHeader: string;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
} & PropsWithChildren;

export function AuthorizationForm({
  navigationButton,
  formHeader,
  handleSubmit,
  children,
}: Props) {
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <NavigationIconButton
          to={navigationButton.to}
          icon={navigationButton.icon}
          sx={{ p: 3, position: "absolute", top: 0, left: 0 }}
        />
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {formHeader}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          {children}
        </Box>
      </Box>
    </Container>
  );
}
