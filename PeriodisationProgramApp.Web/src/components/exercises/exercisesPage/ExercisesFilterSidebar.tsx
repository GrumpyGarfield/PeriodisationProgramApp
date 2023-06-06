import {
  Box,
  Stack,
  Button,
  Drawer,
  Divider,
  IconButton,
  Typography,
  Badge,
} from "@mui/material";
import Iconify from "../../../components/common/iconify/Iconify";
import Scrollbar from "../../../components/common/scrollbar/Scrollbar";
import React, { useState } from "react";
import { EnumCheckboxFilter } from "../../common/filter/enumCheckboxFilter/EnumCheckboxFilter";
import { RatingFilter } from "../../common/filter/ratingFilter/RatingFilter";
import { IFilter } from "../../../types/IFilter";
import useEnumCheckboxFilter from "../../common/filter/enumCheckboxFilter/useEnumCheckboxFilter";
import useRatingFilter from "../../common/filter/ratingFilter/useRatingFilter";
import useExercises from "../../../context/entityContext/entities/exercise/useExercises";
import { MuscleGroupType } from "../../../enums/MuscleGroupType";
import { ExerciseType } from "../../../enums/ExerciseType";
import useEnumMultipleSelectFilter from "../../common/filter/enumSelectFilter/useEnumMultipleSelectFilter";
import { EnumMultipleSelectFilter } from "../../common/filter/enumSelectFilter/EnumMultipleSelectFilter";

export default function ExercisesFilterSidebar() {
  const [activeFilter, setActiveFilter] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const { filterExercises } = useExercises();

  const exerciseTypesFilter = useEnumCheckboxFilter("type", ExerciseType);
  const targetMuscleGroupFilter = useEnumMultipleSelectFilter(
    "targetMuscleGroup",
    MuscleGroupType
  );
  const ratingFilter = useRatingFilter("rating");

  const filters: IFilter[] = [
    exerciseTypesFilter,
    targetMuscleGroupFilter,
    ratingFilter,
  ];

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    filters.map((filter) => filter.isActive()).filter((x) => x).length > 0
      ? setActiveFilter(true)
      : setActiveFilter(false);

    setOpenFilter(false);

    filterExercises(filters.map((filter) => filter.getFilter()));
  };

  const handleClearAllButtonClick = () => {
    filters.forEach((filter) => filter.clear());
  };

  return (
    <>
      <Badge color="secondary" variant="dot" invisible={!activeFilter}>
        <Button
          disableRipple
          color="inherit"
          endIcon={<Iconify icon="ic:round-filter-list" />}
          onClick={handleOpenFilter}
        >
          Filters&nbsp;
        </Button>
      </Badge>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={handleCloseFilter}
        PaperProps={{
          sx: { width: 280, border: "none", overflow: "hidden" },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={handleCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <EnumCheckboxFilter
              label="Type"
              enumName="ExerciseType"
              enumObject={ExerciseType}
              handleChange={exerciseTypesFilter.handleChange}
              checked={exerciseTypesFilter.hasSelected}
            />

            <EnumMultipleSelectFilter
              label="Target Muscle Group"
              selectLabel="Muscle Groups"
              enumName="MuscleGroupType"
              enumObject={MuscleGroupType}
              handleChange={targetMuscleGroupFilter.handleChange}
              selected={targetMuscleGroupFilter.hasSelected}
              value={targetMuscleGroupFilter.value}
            />

            <RatingFilter
              value={ratingFilter.value}
              onChange={ratingFilter.handleChange}
            />
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={handleClearAllButtonClick}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
