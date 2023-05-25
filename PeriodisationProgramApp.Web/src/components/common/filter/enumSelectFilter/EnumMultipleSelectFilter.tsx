import { ReactNode } from "react";
import { EnumHelper } from "../../../../helpers/EnumHelper";
import { SelectChangeEvent } from "@mui/material";
import { MultipleSelectFilter } from "../selectFilter/MultipleSelectFilter";

type Props = {
  label: string;
  selectLabel: string;
  enumName: string;
  enumObject: any;
  value: any[];
  handleChange: (event: SelectChangeEvent<any>, child: ReactNode) => void;
  selected: (item: any) => boolean;
};

export function EnumMultipleSelectFilter({
  label,
  selectLabel,
  enumName,
  enumObject,
  value,
  handleChange,
  selected,
}: Props) {
  const items = EnumHelper.getKeysOfEnum(enumObject);
  const getFormControlLabel = (item: string) => {
    return EnumHelper.translate(enumName, item);
  };

  return (
    <MultipleSelectFilter
      label={label}
      selectLabel={selectLabel}
      items={items}
      value={value}
      handleChange={handleChange}
      selected={selected}
      getFormControlLabel={getFormControlLabel}
    />
  );
}
