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
import { TrainingProgramType } from "../../../enums/TrainingProgramType";
import React, { useState } from "react";
import { TrainingLevel } from "../../../enums/TrainingLevel";
import useTrainingPrograms from "../../../context/entityContext/entities/useTrainingPrograms";
import { EnumFilter } from "../../common/filter/enumCheckboxFilter/EnumCheckboxFilter";
import { NumberRangeFilter } from "../../common/filter/numberRangeFilter/NumberRangeFilter";
import useNumberRangeFilter from "../../common/filter/numberRangeFilter/useNumberRangeFilter";
import { RatingFilter } from "../../common/filter/ratingFilter/RatingFilter";
import { IFilter } from "../../../types/IFilter";
import useEnumCheckboxFilter from "../../common/filter/enumCheckboxFilter/useEnumCheckboxFilter";
import useRatingFilter from "../../common/filter/ratingFilter/useRatingFilter";

const marks: number[] = [2, 3, 4, 5, 6];

export default function TrainingProgramsFilterSidebar() {
  const [activeFilter, setActiveFilter] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const { filterTrainingPrograms } = useTrainingPrograms();

  const trainingProgramTypesFilter = useEnumCheckboxFilter(
    "type",
    TrainingProgramType
  );
  const trainingLevelsFilter = useEnumCheckboxFilter(
    "trainingLevel",
    TrainingLevel
  );
  const numberOfSessionsFilter = useNumberRangeFilter(
    "numberOfSessions",
    marks[0],
    marks[marks.length - 1]
  );
  const ratingFilter = useRatingFilter("rating");

  const filters: IFilter[] = [
    trainingProgramTypesFilter,
    trainingLevelsFilter,
    numberOfSessionsFilter,
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

    filterTrainingPrograms(filters.map((filter) => filter.getFilter()));
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
            <EnumFilter
              label="Split Type"
              enumName="TrainingProgramType"
              enumObject={TrainingProgramType}
              handleChange={trainingProgramTypesFilter.handleChange}
              checked={trainingProgramTypesFilter.hasSelected}
            />

            <NumberRangeFilter
              label="Number of Weekly Sessions"
              range={marks}
              value={numberOfSessionsFilter.value}
              onChange={numberOfSessionsFilter.handleChange}
            />

            <EnumFilter
              label="Training Level"
              enumName="TrainingLevel"
              enumObject={TrainingLevel}
              handleChange={trainingLevelsFilter.handleChange}
              checked={trainingLevelsFilter.hasSelected}
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
