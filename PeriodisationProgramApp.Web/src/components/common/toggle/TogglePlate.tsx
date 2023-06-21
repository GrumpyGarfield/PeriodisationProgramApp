import { ToggleButton, ToggleButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";

type Props = {
  item: any;
  value: any;
  onChange: (...event: any[]) => void;
  selected?: boolean;
} & ToggleButtonProps &
  PropsWithChildren;

export function TogglePlate({
  item,
  value,
  onChange,
  selected,
  children,
  ...props
}: Props) {
  const handleClick = () => {
    console.log(item, value);
    onChange(item);
  };
  return (
    <ToggleButton
      value={item}
      selected={selected !== undefined ? selected : item === value}
      onClick={handleClick}
      sx={{ p: 3 }}
      {...props}
    >
      {children}
    </ToggleButton>
  );
}
