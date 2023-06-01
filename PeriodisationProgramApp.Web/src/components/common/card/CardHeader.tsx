import { Typography, Link, Stack, TypographyProps } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export type Props = {
  id: string;
  text: string;
  menu?: React.ReactNode;
  link?: string;
} & TypographyProps;

export function CardHeader({ id, text, menu, link, ...props }: Props) {
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
        to={link ? link : id}
        sx={{ maxWidth: menu ? "calc(100% - 72px)" : "100%" }}
      >
        <Typography variant="h5" noWrap {...props}>
          {text}
        </Typography>
      </Link>
      {menu}
    </Stack>
  );
}
