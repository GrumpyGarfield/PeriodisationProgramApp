import { Drawer, Toolbar, Divider, List, Box } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SummarizeIcon from "@mui/icons-material/Summarize";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HelpIcon from "@mui/icons-material/Help";
import React from "react";
import { SidebarItem, SidebarItemProps } from "./SidebarItem";

const mainListItems: SidebarItemProps[] = [
  {
    label: "Training Programs",
    link: "training-programs",
    icon: <SummarizeIcon />,
  },
  { label: "Exercises", link: "exercises", icon: <FitnessCenterIcon /> },
  { label: "Muscle Groups", link: "muscle-groups", icon: <InboxIcon /> },
];

const secondaryListItems: SidebarItemProps[] = [
  { label: "About", link: "about", icon: <HelpIcon /> },
];

const drawerWidth = 240;

export function Sidebar() {
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
          {mainListItems.map((item) => (
            <SidebarItem
              key={item.link}
              label={item.label}
              link={item.link}
              children={item.children}
            />
          ))}
        </List>
        <Divider />
        <List>
          {secondaryListItems.map((item) => (
            <SidebarItem
              key={item.link}
              label={item.label}
              link={item.link}
              children={item.children}
            />
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
