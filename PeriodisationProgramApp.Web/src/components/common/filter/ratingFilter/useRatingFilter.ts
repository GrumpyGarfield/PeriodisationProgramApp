import { Dispatch, SetStateAction, useState } from "react";
import { IFilter } from "../../../../types/IFilter";

export interface IRatingFilter extends IFilter {
  value: string | null;
  setValue: Dispatch<SetStateAction<string | null>>;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void;
}

const useRatingFilter = (name: string): IRatingFilter => {
  const [value, setValue] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    console.log(value);
    setValue(value);
  };

  const isActive = () => {
    return value !== null;
  };

  const clear = () => {
    setValue(null);
  };

  const getFilter = () => {
    return {
      name: name,
      value: value === null ? "" : `${value}:`,
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

export default useRatingFilter;
