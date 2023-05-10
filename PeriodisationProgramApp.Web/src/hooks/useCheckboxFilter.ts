import { ChangeEvent, useState } from "react";
import { IInputFilter } from "../types/IInputFilter";

const useCheckboxFilter = (): IInputFilter<string> => {
  const [checked, setChecked] = useState<string[]>([]);
  const checkedSet = new Set(checked);

  const toggleCheckbox = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const value = event.target.name;

    checkedSet.has(value) ? checkedSet.delete(value) : checkedSet.add(value);

    setChecked(Array.from(checkedSet) as []);
  };

  const hasChecked = (name: string) => {
    return checkedSet.has(name);
  };

  const isActive = () => {
    return checked.length > 0;
  };

  return {
    selected: checked,
    setSelected: setChecked,
    changeEvent: toggleCheckbox,
    hasSelected: hasChecked,
    isActive,
  };
};

export default useCheckboxFilter;
