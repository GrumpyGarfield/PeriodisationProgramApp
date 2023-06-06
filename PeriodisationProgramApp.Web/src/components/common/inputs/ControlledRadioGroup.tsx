import {
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

type Props = {
  id: string;
  label?: string;
  value: any;
  items: any[];
  onChange: (...event: any[]) => void;
  getItemLabel?: (item: any) => string;
} & FormControlProps;

export function ControlledRadioGroup({
  id,
  label,
  value,
  items,
  onChange,
  getItemLabel,
  ...formControlProps
}: Props) {
  const labelId = `${id}-select-label`;

  return (
    <FormControl {...formControlProps}>
      {label !== undefined && (
        <FormLabel id={labelId} sx={{ pb: 1 }}>
          {label}
        </FormLabel>
      )}
      <RadioGroup row aria-labelledby={labelId}>
        {items.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Radio checked={item === value} onChange={() => onChange(item)} />
            }
            label={getItemLabel ? getItemLabel(item) : item}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
