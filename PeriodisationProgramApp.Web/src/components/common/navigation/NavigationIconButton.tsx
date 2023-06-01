import { Box, IconButton, BoxProps } from "@mui/material";
import { useNavigate } from "react-router-dom";

export type NavigationIconButtonProps = {
  icon: any;
  to?: string;
} & BoxProps;

export function NavigationIconButton({
  icon,
  to,
  ...boxProps
}: NavigationIconButtonProps) {
  const navigate = useNavigate();

  return (
    <Box {...boxProps}>
      <IconButton
        size="large"
        color="inherit"
        sx={{ opacity: 0.48 }}
        onClick={() => {
          to === undefined ? navigate(-1) : navigate(to);
        }}
      >
        {icon}
      </IconButton>
    </Box>
  );
}
