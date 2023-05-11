import { ChangeEvent } from "react";
import { EnumHelper } from "../../../../helpers/EnumHelper";
import { CheckboxFilter } from "../checkboxFilter/CheckboxFilter";

type Props = {
  label: string;
  enumName: string;
  enumObject: any;
  handleChange: (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  checked: (item: string) => boolean;
};

export function EnumFilter({
  enumName,
  enumObject,
  label,
  handleChange,
  checked,
}: Props) {
  const items = EnumHelper.getKeysOfEnum(enumObject);
  const getFormControlLabel = (item: string) => {
    return EnumHelper.translate(enumName, item);
  };

  return (
    <CheckboxFilter
      label={label}
      items={items}
      handleChange={handleChange}
      checked={checked}
      getFormControlLabel={getFormControlLabel}
    />
  );
}
