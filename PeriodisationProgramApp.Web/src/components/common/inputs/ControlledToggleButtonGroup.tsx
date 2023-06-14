import {
  FormControl,
  FormControlProps,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

type Props = {
  id: string;
  label?: string;
  value: any;
  items: any[];
  onChange: (...event: any[]) => void;
  getItemLabel?: (item: any) => string;
  isItemDisabled?: (item: any) => boolean;
} & FormControlProps;

export function ControlledToggleButtonGroup({
  id,
  label,
  value,
  items,
  onChange,
  getItemLabel,
  isItemDisabled,
  ...formControlProps
}: Props) {
  const labelId = `${id}-toggle-button-group-label`;

  return (
    <FormControl {...formControlProps}>
      {label !== undefined && (
        <FormLabel id={labelId} sx={{ pb: 1 }}>
          {label}
        </FormLabel>
      )}
      <ToggleButtonGroup
        exclusive
        aria-label={`${label}-toggle-group-label`}
        fullWidth
      >
        {items.map((item) => (
          <ToggleButton
            key={item}
            value={item}
            aria-label={getItemLabel ? getItemLabel(item) : item}
            selected={item === value}
            onClick={() => onChange(item)}
            disabled={isItemDisabled ? isItemDisabled(item) : isItemDisabled}
          >
            {getItemLabel ? getItemLabel(item) : item}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </FormControl>
  );
}
