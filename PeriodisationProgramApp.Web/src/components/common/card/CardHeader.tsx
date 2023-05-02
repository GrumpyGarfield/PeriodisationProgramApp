import { Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  id: string;
  text: string;
};

export function CardHeader({ id, text }: Props) {
  return (
    <Link color="inherit" underline="hover" component={RouterLink} to={id}>
      <Typography variant="h5" noWrap>
        {text}
      </Typography>
    </Link>
  );
}
