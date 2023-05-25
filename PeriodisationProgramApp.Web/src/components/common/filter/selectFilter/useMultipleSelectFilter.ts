import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { IFilter } from "../../../../types/IFilter";
import { SelectChangeEvent } from "@mui/material";

export interface IMultipleSelectFilter extends IFilter {
  value: any[];
  setValue: Dispatch<SetStateAction<any[]>>;
  handleChange: (event: SelectChangeEvent<any>, child: ReactNode) => void;
  hasSelected: (item: any) => boolean;
}

const useMultipleSelectFilter = (name: string): IMultipleSelectFilter => {
  const [selected, setSelected] = useState<any[]>([]);

  const handleChange = (event: SelectChangeEvent<any>, child: ReactNode) => {
    const {
      target: { value },
    } = event;
    setSelected(typeof value === "string" ? value.split(",") : value);
  };

  const hasSelected = (item: any) => {
    return selected.indexOf(item) !== -1;
  };

  const isActive = () => {
    return selected.length > 0;
  };

  const clear = () => {
    setSelected([]);
  };

  const getFilter = () => {
    return {
      name: name,
      value: selected.join(","),
    };
  };

  return {
    value: selected,
    setValue: setSelected,
    handleChange,
    hasSelected,
    isActive,
    clear,
    getFilter,
  };
};

export default useMultipleSelectFilter;
