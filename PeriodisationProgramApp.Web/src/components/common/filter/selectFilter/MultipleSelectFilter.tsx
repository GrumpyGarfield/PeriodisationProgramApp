import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Theme,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { theme } from "../../../../styling/Theme";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  label: string;
  selectLabel: string;
  items: any[];
  value: any[];
  handleChange: (event: SelectChangeEvent<any>, child: ReactNode) => void;
  selected: (item: any) => boolean;
  getFormControlLabel?: (item: string) => string;
};

export function MultipleSelectFilter({
  label,
  selectLabel,
  items,
  value,
  handleChange,
  selected,
  getFormControlLabel,
}: Props) {
  const getStyles = (item: string, theme: Theme) => {
    return {
      fontWeight: selected(item)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  };

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <FormControl sx={{ mt: 1, width: "100%" }}>
        <Select
          displayEmpty
          multiple
          value={value}
          onChange={handleChange}
          MenuProps={MenuProps}
          renderValue={(selected) => {
            return selected.length < 1 ? (
              <Box sx={{ color: theme.palette.grey[500] }}>{selectLabel}</Box>
            ) : (
              selected.join(", ")
            );
          }}
        >
          {items.map((item) => (
            <MenuItem key={item} value={item} style={getStyles(item, theme)}>
              {getFormControlLabel === undefined
                ? item
                : getFormControlLabel(item)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
