import { useState } from "react";

const useNumberRangeFilter = (minValue: number, maxValue: number) => {
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

  const getValueString = () => {
    return `${value[0]}:${value[1]}`;
  };

  const isActive = () => {
    return value[0] !== minValue || value[1] !== maxValue;
  };

  return {
    value,
    setValue,
    handleChange,
    getValueString,
    isActive,
  };
};

export default useNumberRangeFilter;
