import {
  ListItem,
  ListItemIcon,
  ListItemIconProps,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";

export type CardListItemProps = {
  label: string | ReactNode;
  text: string;
  icon: ReactNode & SvgIconProps;
} & ListItemIconProps;

export function CardListItem({
  label,
  text,
  icon,
  ...props
}: CardListItemProps) {
  const sxProps = props.sx === undefined ? { minWidth: 0, mr: 3 } : props.sx;

  return (
    <ListItem sx={{ p: 0.5 }}>
      <Tooltip arrow title={label}>
        <ListItemIcon sx={sxProps} {...props}>
          {icon}
        </ListItemIcon>
      </Tooltip>
      <ListItemText
        primary={
          <Typography variant="subtitle2" sx={{ lineHeight: "24px" }} noWrap>
            {text}
          </Typography>
        }
        sx={{ color: "primary" }}
      />
    </ListItem>
  );
}
