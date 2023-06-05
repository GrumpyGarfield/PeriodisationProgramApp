import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Theme,
} from "@mui/material";
import { theme } from "../../../styling/Theme";

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
  items: any[];
  selectedItemKeys: any[];
  handleChange: (event: SelectChangeEvent<any[]>) => void;
  getItemLabel?: (item: any) => string;
  keyPropertyName?: string;
};

function getStyles(itemKey: any, selectedItemKeys: any[], theme: Theme) {
  return {
    fontWeight:
      selectedItemKeys.indexOf(itemKey) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function ControlledSelectMultiple({
  label,
  items,
  selectedItemKeys,
  handleChange,
  getItemLabel,
  keyPropertyName,
}: Props) {
  const labelId = `${label.replaceAll(" ", "-").toLowerCase()}-select-label`;

  return (
    <FormControl sx={{ mt: 1, width: "100%" }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        multiple
        fullWidth
        displayEmpty
        labelId={labelId}
        label={label}
        MenuProps={MenuProps}
        value={selectedItemKeys}
        onChange={handleChange}
        renderValue={(selectedItems) => {
          return selectedItems.length < 1 ? (
            <Box sx={{ color: theme.palette.grey[500] }}>{label}</Box>
          ) : keyPropertyName && getItemLabel ? (
            items
              .filter(
                (item) => selectedItems.indexOf(item[keyPropertyName]) > -1
              )
              .map((item) => getItemLabel(item))
              .join(", ")
          ) : (
            selectedItems.join(", ")
          );
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={keyPropertyName ? item[keyPropertyName] : item}
            value={keyPropertyName ? item[keyPropertyName] : item}
            style={getStyles(
              keyPropertyName ? item[keyPropertyName] : item,
              selectedItemKeys,
              theme
            )}
          >
            {keyPropertyName
              ? getItemLabel
                ? getItemLabel(item)
                : item[keyPropertyName]
              : item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
