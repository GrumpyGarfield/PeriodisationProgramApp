import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { IFilter } from "../../../../types/IFilter";

export interface ICheckboxFilter extends IFilter {
  value: string[];
  setValue: Dispatch<SetStateAction<string[]>>;
  handleChange: (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  hasSelected: (name: string) => boolean;
}

const useCheckboxFilter = (name: string): ICheckboxFilter => {
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

  const clear = () => {
    setChecked([]);
  };

  const getFilter = () => {
    return {
      name: name,
      value: checked.join(","),
    };
  };

  return {
    value: checked,
    setValue: setChecked,
    handleChange: toggleCheckbox,
    hasSelected: hasChecked,
    isActive,
    clear,
    getFilter,
  };
};

export default useCheckboxFilter;
