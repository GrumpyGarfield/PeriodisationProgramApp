import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Rating,
  RadioGroupProps,
} from "@mui/material";

export const FILTER_RATING_OPTIONS = ["4", "3", "2", "1"];

export function RatingFilter({ value, onChange }: RadioGroupProps) {
  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Rating
      </Typography>
      <RadioGroup value={value} onChange={onChange}>
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
                checked={value === item}
                sx={{
                  "&:hover": { color: "transparent" },
                }}
              />
            }
            label="& Up"
            sx={{
              my: 0.5,
              borderRadius: 1,
              opacity: value === item ? 1 : 0.48,
              "&:hover": { opacity: 1 },
            }}
          />
        ))}
      </RadioGroup>
    </div>
  );
}
