import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
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
  selectedItemKey: any;
  handleChange: (event: SelectChangeEvent) => void;
  getItemLabel?: (item: any) => string;
  keyPropertyName?: string;
  errorText?: string;
} & SelectProps;

export function ControlledSelect({
  label,
  items,
  selectedItemKey,
  handleChange,
  getItemLabel,
  keyPropertyName,
  errorText,
  error,
  ...selectProps
}: Props) {
  const labelId = `${label.replaceAll(" ", "-").toLowerCase()}-select-label`;

  return (
    <FormControl sx={{ mt: 1, width: "100%" }}>
      <InputLabel
        id={labelId}
        sx={{
          color: error
            ? theme.palette.error.main
            : theme.palette.text.secondary,
        }}
      >
        {label}
      </InputLabel>
      <Select
        fullWidth
        displayEmpty
        labelId={labelId}
        label={label}
        MenuProps={MenuProps}
        value={selectedItemKey}
        onChange={handleChange}
        error={error}
        {...selectProps}
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
      {error ? (
        <FormHelperText sx={{ color: theme.palette.error.main }}>
          {errorText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}
