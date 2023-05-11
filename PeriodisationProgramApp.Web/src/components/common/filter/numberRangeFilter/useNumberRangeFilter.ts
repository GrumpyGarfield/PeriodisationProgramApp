import { Dispatch, SetStateAction, useState } from "react";
import { IFilter } from "../../../../types/IFilter";

export interface INumberRangeFilter extends IFilter {
  value: number[];
  setValue: Dispatch<SetStateAction<number[]>>;
  handleChange: (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => void;
}

const useNumberRangeFilter = (
  name: string,
  minValue: number,
  maxValue: number
): INumberRangeFilter => {
  const [value, setValue] = useState<number[]>([minValue, maxValue]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    activeThumb === 0
      ? setValue([Math.min(newValue[0], value[1]), value[1]])
      : setValue([value[0], Math.max(newValue[1], value[0])]);
  };

  const isActive = () => {
    return value[0] !== minValue || value[1] !== maxValue;
  };

  const clear = () => {
    setValue([minValue, maxValue]);
  };

  const getFilter = () => {
    return {
      name: name,
      value: `${value[0]}:${value[1]}`,
    };
  };

  return {
    value,
    setValue,
    handleChange,
    isActive,
    clear,
    getFilter,
  };
};

export default useNumberRangeFilter;
