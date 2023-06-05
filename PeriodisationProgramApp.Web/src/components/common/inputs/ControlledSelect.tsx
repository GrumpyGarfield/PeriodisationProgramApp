import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

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
  selectedItemKey: any;
  handleChange: (event: SelectChangeEvent) => void;
  getItemLabel?: (item: any) => string;
  keyPropertyName?: string;
};

export function ControlledSelect({
  label,
  items,
  selectedItemKey,
  handleChange,
  getItemLabel,
  keyPropertyName,
}: Props) {
  const labelId = `${label.replaceAll(" ", "-").toLowerCase()}-select-label`;

  return (
    <FormControl sx={{ mt: 1, width: "100%" }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        fullWidth
        displayEmpty
        labelId={labelId}
        label={label}
        MenuProps={MenuProps}
        value={selectedItemKey}
        onChange={handleChange}
      >
        {items.map((item) => (
          <MenuItem
            key={keyPropertyName ? item[keyPropertyName] : item}
            value={keyPropertyName ? item[keyPropertyName] : item}
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
