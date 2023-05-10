import { Typography, FormGroup, FormControlLabel } from "@mui/material";
import { IEnumFilter } from "../../../types/IEnumFilter";
import { EnumHelper } from "../../../helpers/EnumHelper";
import { CheckboxFilter } from "./CheckboxFilter";

export function EnumFilter({
  label,
  enumName,
  enumObject,
  inputFilter,
}: IEnumFilter) {
  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <FormGroup>
        {EnumHelper.getKeysOfEnum(enumObject).map((item) => (
          <FormControlLabel
            key={item}
            control={
              <CheckboxFilter
                item={item}
                onChange={inputFilter.changeEvent}
                checked={inputFilter.hasSelected}
              />
            }
            label={EnumHelper.translate(enumName, item)}
          />
        ))}
      </FormGroup>
    </div>
  );
}
