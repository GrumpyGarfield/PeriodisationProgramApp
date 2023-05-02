import { useState } from "react";
import { Menu, Button, MenuItem, Typography } from "@mui/material";
import Iconify from "../../../components/common/iconify/Iconify";

type Option = {
  value: string;
  label: string;
};

const SORT_BY_OPTIONS: Option[] = [
  { value: "rating", label: "Rating" },
  { value: "popularity", label: "Popularity" },
  { value: "newest", label: "Newest" },
  { value: "name", label: "Name" },
];

export default function TrainingProgramsSort() {
  const [open, setOpen] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);
  const [currentOption, setOption] = useState<string>("rating");

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handlePicked = (value: string) => {
    setOption(value);
    handleClose();
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={
          <Iconify
            icon={open ? "eva:chevron-up-fill" : "eva:chevron-down-fill"}
          />
        }
      >
        Sort By:&nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: "text.secondary" }}
        >
          {currentOption}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === currentOption}
            onClick={() => handlePicked(option.value)}
            sx={{ typography: "body2" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
