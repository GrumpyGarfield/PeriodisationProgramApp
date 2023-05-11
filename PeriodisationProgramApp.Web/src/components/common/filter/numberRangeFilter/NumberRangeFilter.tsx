import { Typography, Slider, SliderProps } from "@mui/material";

type Props = {
  label: string;
  range: number[];
} & SliderProps;

export function NumberRangeFilter({
  label,
  range,
  value,
  onChange,
  ...props
}: Props) {
  return (
    <div>
      <Typography id="non-linear-slider" variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <Slider
        min={2}
        max={6}
        step={1}
        getAriaLabel={() => label}
        value={value}
        onChange={onChange}
        valueLabelDisplay="off"
        marks={range.map((mark) => ({
          label: mark.toString(),
          value: mark,
        }))}
        {...props}
      />
    </div>
  );
}
