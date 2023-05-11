import { useEffect, useState } from "react";
import { Menu, Button, MenuItem, Typography } from "@mui/material";
import Iconify from "../../../components/common/iconify/Iconify";
import useTrainingPrograms from "../../../context/entities/useTrainingPrograms";
import { EntitySorting } from "../../../types/EntitySorting";
import { SortDirection } from "../../../enums/SortDirection";

type Option = {
  label: string;
} & EntitySorting;

const SORT_BY_OPTIONS: Option[] = [
  { label: "Rating", sortBy: "rating", sortDir: SortDirection.Desc },
  {
    label: "Popularity",
    sortBy: "likes",
    sortDir: SortDirection.Desc,
  },
  { label: "Newest", sortBy: "created", sortDir: SortDirection.Desc },
  { label: "Name", sortBy: "name", sortDir: SortDirection.Asc },
];

export default function TrainingProgramsSort() {
  const [open, setOpen] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);
  const { setSortParams } = useTrainingPrograms();
  const [currentOption, setOption] = useState<string>("rating");

  useEffect(() => {
    const option = SORT_BY_OPTIONS.find(
      (option) => option.sortBy === currentOption
    );
    setSortParams(
      option === undefined
        ? option
        : { sortBy: option.sortBy, sortDir: option.sortDir }
    );
  }, [currentOption, setSortParams]);

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
            key={option.sortBy}
            selected={option.sortBy === currentOption}
            onClick={() => handlePicked(option.sortBy)}
            sx={{ typography: "body2" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
