import { MenuItem } from "@mui/material";
import Iconify from "../iconify/Iconify";

export type CardMenuItemProps = {
  icon: string;
  label: string;
  onClick?: (event: any) => void;
  color?: string;
};

export function CardMenuItem({
  icon,
  label,
  onClick,
  color,
}: CardMenuItemProps) {
  return (
    <MenuItem sx={{ color: color }} onClick={onClick}>
      <Iconify icon={icon} sx={{ mr: 2 }} />
      {label}
    </MenuItem>
  );
}
