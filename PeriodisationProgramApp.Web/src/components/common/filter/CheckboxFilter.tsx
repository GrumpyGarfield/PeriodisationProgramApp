import { Checkbox } from "@mui/material";
import { ChangeEvent } from "react";

type Props = {
  item: string;
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  checked: (item: string) => boolean;
};

export function CheckboxFilter({ item, onChange, checked }: Props) {
  return <Checkbox name={item} onChange={onChange} checked={checked(item)} />;
}
