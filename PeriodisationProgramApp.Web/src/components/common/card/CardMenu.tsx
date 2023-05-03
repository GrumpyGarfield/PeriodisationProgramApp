import { Box, IconButton, Popover } from "@mui/material";
import Iconify from "../iconify/Iconify";
import React from "react";
import { CardMenuItem, CardMenuItemProps } from "./CardMenuItem";

type Props = {
  raised: boolean;
  setRaised: (isRaised: boolean) => void;
  cardMenuItems: CardMenuItemProps[];
};

export function CardMenu({ raised, setRaised, cardMenuItems }: Props) {
  const [open, setOpen] = React.useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setRaised(false);
  };

  return (
    <Box sx={{ pl: 3, visibility: raised ? "visible" : "hidden" }}>
      <IconButton
        size="large"
        color="inherit"
        sx={{ opacity: 0.48 }}
        onClick={handleOpenMenu}
      >
        <Iconify icon={"eva:more-horizontal-fill"} />
      </IconButton>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            p: 1,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        {cardMenuItems.map((cardMenuItem) => (
          <CardMenuItem
            key={cardMenuItem.label}
            icon={cardMenuItem.icon}
            label={cardMenuItem.label}
            color={cardMenuItem.color}
          />
        ))}
      </Popover>
    </Box>
  );
}
