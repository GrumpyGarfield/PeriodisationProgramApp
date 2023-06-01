import { ChangeEvent } from "react";
import { useEnumHelper } from "../../../../helpers/useEnumHelper";
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

export function EnumCheckboxFilter({
  enumName,
  enumObject,
  label,
  handleChange,
  checked,
}: Props) {
  const { translate, getKeysOfEnum } = useEnumHelper();
  const items = getKeysOfEnum(enumObject);
  const getFormControlLabel = (item: string) => {
    return translate(enumName, item);
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
