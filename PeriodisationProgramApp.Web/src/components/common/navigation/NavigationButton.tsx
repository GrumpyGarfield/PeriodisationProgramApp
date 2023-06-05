import { Button, ButtonProps } from "@mui/material";
import { useNavigate } from "react-router-dom";

export type NavigationButtonProps = {
  text: string;
  icon?: any;
  to?: string;
} & ButtonProps;

export function NavigationButton({
  text,
  icon,
  to,
  ...buttonProps
}: NavigationButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      variant="text"
      startIcon={icon}
      onClick={() => {
        to === undefined ? navigate(-1) : navigate(to);
      }}
      sx={{ width: 100 }}
      {...buttonProps}
    >
      {text}
    </Button>
  );
}
