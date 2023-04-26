import {
  Drawer,
  Toolbar,
  Divider,
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import React from "react";
import { ListItemLink } from "../common/ListItemLink";

const drawerWidth = 240;

export function Sidebar() {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem
            key={"Training Programs"}
            disablePadding
            component={ListItemLink}
            to="training-programs"
          >
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={() => setSelectedIndex(0)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Training Programs"}
                sx={{ color: "primary" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"Exercises"}
            disablePadding
            component={ListItemLink}
            to="exercises"
          >
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={() => setSelectedIndex(1)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Exercises"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"Muscle Groups"}
            disablePadding
            component={ListItemLink}
            to="muscle-groups"
          >
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={() => setSelectedIndex(2)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Muscle Groups"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            key={"About"}
            disablePadding
            component={ListItemLink}
            to="about"
          >
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={() => setSelectedIndex(3)}
            >
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"About"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
