import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface IInputFilter<T> {
  selected: T[];
  setSelected: Dispatch<SetStateAction<T[]>>;
  changeEvent: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  hasSelected: (item: T) => boolean;
}
