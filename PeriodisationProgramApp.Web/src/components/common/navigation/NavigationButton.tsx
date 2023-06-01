import { Box, BoxProps, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export type NavigationButtonProps = {
  text: string;
  icon?: any;
  to?: string;
} & BoxProps;

export function NavigationButton({
  text,
  icon,
  to,
  ...boxProps
}: NavigationButtonProps) {
  const navigate = useNavigate();

  return (
    <Box {...boxProps}>
      <Button
        variant="text"
        startIcon={icon}
        onClick={() => {
          to === undefined ? navigate(-1) : navigate(to);
        }}
      >
        {text}
      </Button>
    </Box>
  );
}
