import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export type SidebarItemProps = {
  label: string;
  link: string;
  icon?: any;
  children?: SidebarItemProps[];
};

export function SidebarItem({ label, link, icon, children }: SidebarItemProps) {
  const [open, setOpen] = useState(false);
  const level = link.split("/").length;

  return (
    <>
      {children ? (
        <>
          <ListItemButton
            onClick={() => children !== undefined && setOpen(!open)}
            sx={{ pl: level * 3 }}
          >
            {" "}
            {icon !== undefined && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={label} />
            {children !== undefined && (open ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children.map((item) => (
                <SidebarItem
                  key={item.link}
                  label={item.label}
                  link={`${link}/${item.link}`}
                  children={item.children}
                />
              ))}
            </List>
          </Collapse>
        </>
      ) : (
        <NavLink to={link}>
          {({ isActive }) => (
            <ListItemButton selected={isActive} sx={{ pl: level * 3 }}>
              {icon !== undefined && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={label} />
            </ListItemButton>
          )}
        </NavLink>
      )}
    </>
  );
}
