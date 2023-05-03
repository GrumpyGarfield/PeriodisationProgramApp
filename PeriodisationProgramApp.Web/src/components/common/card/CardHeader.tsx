import { Typography, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  id: string;
  text: string;
  menu?: React.ReactNode;
};

export function CardHeader({ id, text, menu }: Props) {
  return (
    <Stack
      direction="row"
      flexWrap="wrap-reverse"
      alignItems="center"
      justifyContent="space-between"
    >
      <Link
        color="inherit"
        underline="hover"
        component={RouterLink}
        to={id}
        sx={{ maxWidth: "calc(100% - 72px)" }}
      >
        <Typography variant="h5" noWrap>
          {text}
        </Typography>
      </Link>
      {menu}
    </Stack>
  );
}
