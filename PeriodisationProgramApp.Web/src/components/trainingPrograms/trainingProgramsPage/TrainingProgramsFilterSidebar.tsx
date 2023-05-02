import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  Slider,
} from "@mui/material";
// components
import Iconify from "../../../components/common/iconify/Iconify";
import Scrollbar from "../../../components/common/scrollbar/Scrollbar";
import { EnumHelper } from "../../../helpers/EnumHelper";
import { TrainingProgramType } from "../../../enums/TrainingProgramType";
import React from "react";
import { TrainingLevel } from "../../../enums/TrainingLevel";

export const FILTER_CATEGORY_OPTIONS = [
  "All",
  "Shose",
  "Apparel",
  "Accessories",
];
export const FILTER_RATING_OPTIONS = [
  "up4Star",
  "up3Star",
  "up2Star",
  "up1Star",
];
export const FILTER_PRICE_OPTIONS = [
  { value: "below", label: "Below $25" },
  { value: "between", label: "Between $25 - $75" },
  { value: "above", label: "Above $75" },
];

type Props = {
  openFilter: boolean;
  onOpenFilter: () => void;
  onCloseFilter: () => void;
};

const marks: number[] = [2, 3, 4, 5, 6];

export default function TrainingProgramsFilterSidebar({
  openFilter,
  onOpenFilter,
  onCloseFilter,
}: Props) {
  const [numberOfSessions, setNumberOfSessions] = React.useState<number[]>([
    2, 6,
  ]);

  const handleNumberOfSessionsChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setNumberOfSessions([
        Math.min(newValue[0], numberOfSessions[1]),
        numberOfSessions[1],
      ]);
    } else {
      setNumberOfSessions([
        numberOfSessions[0],
        Math.max(newValue[1], numberOfSessions[0]),
      ]);
    }
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
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
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Split Type
              </Typography>
              <FormGroup>
                {EnumHelper.getKeysOfEnum(TrainingProgramType).map((item) => (
                  <FormControlLabel
                    key={item}
                    control={<Checkbox />}
                    label={EnumHelper.translate("TrainingProgramType", item)}
                  />
                ))}
              </FormGroup>
            </div>

            <div>
              <Typography
                id="non-linear-slider"
                variant="subtitle1"
                gutterBottom
              >
                Number of Weekly Sessions
              </Typography>
              <Slider
                min={2}
                max={6}
                step={1}
                getAriaLabel={() => "Number of sessions"}
                value={numberOfSessions}
                onChange={handleNumberOfSessionsChange}
                valueLabelDisplay="off"
                marks={marks.map((mark) => ({
                  label: mark.toString(),
                  value: mark,
                }))}
              />
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Training Level
              </Typography>
              <FormGroup>
                {EnumHelper.getKeysOfEnum(TrainingLevel).map((item) => (
                  <FormControlLabel
                    key={item}
                    control={<Checkbox />}
                    label={EnumHelper.translate("TrainingLevel", item)}
                  />
                ))}
              </FormGroup>
            </div>

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
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
