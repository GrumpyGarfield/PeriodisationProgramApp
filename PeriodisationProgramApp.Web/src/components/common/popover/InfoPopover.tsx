import Popover, { PopoverOrigin } from "@mui/material/Popover";
import { Box, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { PropsWithChildren, useState } from "react";

type Props = {
  anchorOrigin?: PopoverOrigin;
} & PropsWithChildren;

export default function InfoPopover({ anchorOrigin, children }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} size="small" onClick={handleClick}>
        <InfoIcon fontSize="inherit" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={
          anchorOrigin
            ? anchorOrigin
            : {
                vertical: "top",
                horizontal: "right",
              }
        }
        PaperProps={{
          sx: { maxWidth: 600 },
        }}
      >
        <Box sx={{ p: 2 }}>{children}</Box>
      </Popover>
    </div>
  );
}
