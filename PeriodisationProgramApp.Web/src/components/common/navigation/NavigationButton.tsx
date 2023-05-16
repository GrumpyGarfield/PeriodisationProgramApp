import { Box, IconButton, BoxProps } from "@mui/material";
import { useNavigate } from "react-router-dom";

export type NavigationButtonProps = {
  icon: any;
  to?: string;
} & BoxProps;

export function NavigationButton({
  icon,
  to,
  ...boxProps
}: NavigationButtonProps) {
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
