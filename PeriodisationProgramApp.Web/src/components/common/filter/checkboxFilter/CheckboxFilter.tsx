import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";

type Props = {
  label: string;
  items: string[];
  handleChange: (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  checked: (item: string) => boolean;
  getFormControlLabel?: (item: string) => string;
};

export function CheckboxFilter({
  label,
  items,
  handleChange,
  checked,
  getFormControlLabel,
}: Props) {
  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <FormGroup>
        {items.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                name={item}
                onChange={handleChange}
                checked={checked(item)}
              />
            }
            label={
              getFormControlLabel === undefined
                ? item
                : getFormControlLabel(item)
            }
          />
        ))}
      </FormGroup>
    </div>
  );
}
