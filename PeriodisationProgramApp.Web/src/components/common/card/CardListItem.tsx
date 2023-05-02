import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";

export type CardListItemProps = {
  text: string;
  icon: ReactNode & SvgIconProps;
};

export function CardListItem({ text, icon }: CardListItemProps) {
  return (
    <ListItem sx={{ p: 1 }}>
      <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="subtitle2" sx={{ lineHeight: "20px" }} noWrap>
            {text}
          </Typography>
        }
        sx={{ color: "primary" }}
      />
    </ListItem>
  );
}
