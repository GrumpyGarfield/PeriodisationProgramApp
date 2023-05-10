import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  Badge,
} from "@mui/material";
import Iconify from "../../../components/common/iconify/Iconify";
import Scrollbar from "../../../components/common/scrollbar/Scrollbar";
import { TrainingProgramType } from "../../../enums/TrainingProgramType";
import React, { useState } from "react";
import { TrainingLevel } from "../../../enums/TrainingLevel";
import useTrainingPrograms from "../../../context/entities/useTrainingPrograms";
import { EnumFilter } from "../../common/filter/EnumFilter";
import useCheckboxFilter from "../../../hooks/useCheckboxFilter";
import { EnumHelper } from "../../../helpers/EnumHelper";
import { NumberRangeFilter } from "../../common/filter/NumberRangeFilter";
import useNumberRangeFilter from "../../../hooks/useNumberRangeFilter";

export const FILTER_RATING_OPTIONS = [
  "up4Star",
  "up3Star",
  "up2Star",
  "up1Star",
];

const marks: number[] = [2, 3, 4, 5, 6];

export default function TrainingProgramsFilterSidebar() {
  const [activeFilter, setActiveFilter] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const { filterTrainingPrograms } = useTrainingPrograms();
  const trainingProgramTypesFilter = useCheckboxFilter();
  const trainingLevelsFilter = useCheckboxFilter();
  const numberOfSessionsFilter = useNumberRangeFilter(
    marks[0],
    marks[marks.length - 1]
  );

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    trainingProgramTypesFilter.isActive() ||
    trainingLevelsFilter.isActive() ||
    numberOfSessionsFilter.isActive()
      ? setActiveFilter(true)
      : setActiveFilter(false);

    setOpenFilter(false);

    filterTrainingPrograms([
      {
        name: "type",
        value: EnumHelper.getEnumValuesString(
          trainingProgramTypesFilter.selected,
          TrainingProgramType
        ),
      },
      {
        name: "trainingLevel",
        value: EnumHelper.getEnumValuesString(
          trainingLevelsFilter.selected,
          TrainingLevel
        ),
      },
      {
        name: "numberOfSessions",
        value: numberOfSessionsFilter.getValueString(),
      },
    ]);
  };

  const handleClearAllButtonClick = () => {
    numberOfSessionsFilter.setValue([2, 6]);
    trainingProgramTypesFilter.setSelected([]);
    trainingLevelsFilter.setSelected([]);
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
              inputFilter={trainingProgramTypesFilter}
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
              inputFilter={trainingLevelsFilter}
            />

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Rating
              </Typography>
              <RadioGroup>
                {FILTER_RATING_OPTIONS.map((item, index) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={
                      <Radio
                        disableRipple
                        color="default"
                        icon={<Rating readOnly value={4 - index} />}
                        checkedIcon={<Rating readOnly value={4 - index} />}
                        sx={{
                          "&:hover": { bgcolor: "transparent" },
                        }}
                      />
                    }
                    label="& Up"
                    sx={{
                      my: 0.5,
                      borderRadius: 1,
                      "&:hover": { opacity: 0.48 },
                    }}
                  />
                ))}
              </RadioGroup>
            </div>
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
