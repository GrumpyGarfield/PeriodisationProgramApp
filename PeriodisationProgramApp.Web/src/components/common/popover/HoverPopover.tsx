import { Popover, Box } from "@mui/material";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";

type Props = {
  id: string;
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
} & PropsWithChildren;

export function HoverPopover({ id, anchorEl, setAnchorEl, children }: Props) {
  return (
    <Popover
      id={id}
      sx={{
        pointerEvents: "none",
      }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={() => setAnchorEl(null)}
      disableRestoreFocus
    >
      <Box
        onMouseEnter={() => {
          setAnchorEl(anchorEl);
        }}
        onMouseLeave={() => setAnchorEl(null)}
        sx={{ p: 1, pointerEvents: "auto" }}
      >
        {children}
      </Box>
    </Popover>
  );
}
